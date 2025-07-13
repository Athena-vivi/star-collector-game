import { NextRequest } from 'next/server';

const FAL_KEY = process.env.FAL_KEY;
const FAL_URL = 'https://fal.run/fal-ai/stable-diffusion-v35-large';

export async function POST(req: NextRequest) {
  try {
    const { prompt, width, height } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: '缺少prompt参数' }), { status: 400 });
    }

    if (!FAL_KEY) {
      console.error('FAL_KEY环境变量未配置');
      return new Response(JSON.stringify({ error: 'AI服务配置错误' }), { status: 500 });
    }

    // 最大分辨率限制，防止 Fal.ai 报错
    const maxW = 1024;
    const maxH = 1024;
    const w = Math.min(typeof width === 'number' && width > 0 ? width : 1024, maxW);
    const h = Math.min(typeof height === 'number' && height > 0 ? height : 1024, maxH);

    console.log('开始生成图片，prompt:', prompt, 'width:', w, 'height:', h);

    // 调用Fal.ai生成图片
    const response = await fetch(FAL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${prompt}, high quality, detailed, ${w}x${h} resolution, masterpiece`,
        width: w,
        height: h,
        num_inference_steps: 30,
        guidance_scale: 7.5,
      }),
    });

    console.log('Fal.ai响应状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fal.ai API错误:', errorText);
      return new Response(JSON.stringify({ 
        error: `AI图片生成失败: ${response.status} ${response.statusText}` 
      }), { status: 500 });
    }

    const data = await response.json();
    console.log('Fal.ai响应数据:', JSON.stringify(data, null, 2));

    // 检查Fal.ai返回的数据结构
    if (!data || !data.images || !Array.isArray(data.images) || data.images.length === 0) {
      console.error('Fal.ai返回数据格式错误:', data);
      return new Response(JSON.stringify({ error: 'AI返回数据格式错误' }), { status: 500 });
    }

    const imageUrl = data.images[0].url;
    
    if (!imageUrl || typeof imageUrl !== 'string') {
      console.error('图片URL无效:', imageUrl);
      return new Response(JSON.stringify({ error: '未获取到有效的图片链接' }), { status: 500 });
    }

    console.log('成功生成图片:', imageUrl);

    return new Response(JSON.stringify({ 
      success: true,
      url: imageUrl 
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('Space-Image API错误:', error);
    return new Response(JSON.stringify({ 
      error: '图片生成服务暂时不可用' 
    }), { status: 500 });
  }
}

 
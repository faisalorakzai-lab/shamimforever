import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const { imageStr } = await req.json()

    if (!imageStr) {
      return NextResponse.json({ error: 'Missing image payload' }, { status: 400 })
    }

    const response = await cloudinary.uploader.upload(imageStr, {
      folder: 'shamim_forever_products',
      transformation: [{ width: 1200, quality: 'auto' }],
    })

    return NextResponse.json({ success: true, url: response.secure_url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

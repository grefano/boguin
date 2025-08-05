import { Cloudinary } from '@cloudinary/url-gen'

const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME}})

export function get_cloud_url_thumbnail(_public_id: string): string{
  return cld.image('thumbnails/'+_public_id).format('auto').quality('auto').toURL() 
}

export function get_cloud_url_video(_public_id: string): string{
  return cld.video('videos/'+_public_id).format('auto').quality('auto').toURL() 
}



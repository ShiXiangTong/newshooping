import {request} from "./network"; //因为导出的是个export方式
 
export function getMultiData() {  //请求轮播图数据
  return request({
    url: '/home/multidata'
  })
}

export function getProductData(type,page){ //请求三个列表数据
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}

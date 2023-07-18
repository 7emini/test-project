import instance from "@/utils/request"

export function CommonApi(params) {
    return instance.request({
        method: params.method,
        url: params.url,
        data: params.data, 
    });
}

export function uploadFile(data = {}) {
    return instance.request({
      method: "post",
      url: "/upload",
      data,
    });
  }
import request from '@/utils/request'

export function getDeviceInfo() {
  return request({
    url: '/device/info',
    method: 'get'
  })
}

export function updateDevice(data) {
  return request({
    url: '/device/update',
    method: 'post',
    data
  })
}

export function createDevice(data) {
  return request({
    url: '/device/create',
    method: 'post',
    data
  })
}

export function delDevice(data) {
  return request({
    url: '/device/delete',
    method: 'post',
    data
  })
}

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

// axios 的配置项
const config = {
    // baseURL: 'http://localhost:8421',   // 请求接口的地址
    baseURL: '/api',
    timeout: 10000
}

// 定义返回值类型
export interface R<T = any> {
    code: number,
    msg: string,
    data: T
}

class Http {
    private instance: AxiosInstance;

    constructor(configs: AxiosRequestConfig){
        this.instance = axios.create(config);
        this.insterceptors();
    }

    private insterceptors() {
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
            let token = '';
            if(token && config) {
                config.headers!['token'] = token;
            }
            return config;
        }), (error: any) => {
            error.data = {};
            error.data.msg = '服务器异常，请联系管理员';
            return error;
        }
        this.instance.interceptors.response.use((res: AxiosResponse)=>{
            if(res.data.code == 200) {
                return res.data;
            } else {
                ElMessage.error(res.data.msg || '接口报错！');
                return Promise.reject(res.data.msg || '接口报错！');
            }
        }), (error: any) => {
            console.log('进入错误');
            error.data ={};
            if(error && error.response){
                switch(error.response.status){
                    case 400:
                        error.data.msg ='错误请求';
                        ElMessage.error(error.data.msg)
                        break;
                    case 401:
                        error.data.msg='未授权，请重新登录';
                        ElMessage.error(error.data.msg);
                        break
                    case 403:
                        error.data.msg='拒绝访问';
                        ElMessage.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg ='请求错误,未找到接口';ElMessage.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg='请求方法未允许'
                        ElMessage.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg='请求超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg='服务器端出错';
                        ElMessage.error(error.data.msg)
                        break;
                    case 501:
                        error.data.msg ='网络未实现'
                        ElMessage.error(error .data.msg)
                        break
                    case 502:
                        error.data.msg='网络错误';
                        ElMessage.error(error .data.msg)
                        break
                    case 503:
                        error.data.msg='服务不可用'
                        ElMessage.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg='网络超时';
                        ElMessage.error(error .data.msg)
                        break
                    case 505:
                        error.data.msg='http版本不支持该请求'
                        ElMessage.error(error.data.msg)
                        break
                    default:
                        error.data.msg=`连接错误${error.response.status}`
                        ElMessage.error(error.data.msg)
                }
            } else {
                error.data.msg = "连接到服务器失败";
                ElMessage.error(error.data.msg)
            }
            return Promise.reject(error);
        }
    }

    post<T = R>(url: string, data?: object): Promise<T> {
        return this.instance.post(url, data);
    }

    put<T = R>(url: string, data?: object): Promise<T> {
        return this.instance.put(url, data);
    }

    get<T = R>(url: string, params?: object): Promise<T> {
        return this.instance.get(url, {params});
    }

    delete<T = R>(url: string): Promise<T> {
        return this.instance.delete(url);
    }

    //图片上传
    upload<T = R>(url:string, params?: object): Promise<T>{
        return this.instance.post(url, params, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default new Http(config)

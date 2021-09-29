const baseURL = "http://81.68.74.93:4000"

export const myRequest =(options) =>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseURL+options.url,//接口地址：前缀+方法中传入的地址
			method:options.method || 'GET',//请求方法：传入的方法或者默认是“GET”
			data:options.data || {},//传递参数：传入的参数或者默认传递空集合
			success:(res)=> {
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				// if(res.data.code != 200){
				// 	return uni.showToast({
				// 		title:'获取数据失败',
				// 		icon:'none'
				// 	})
				// }
				// 如果不满足上述判断就输出数据
				resolve(res)
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				uni.showToast({
					title:"请求接口失败",
					icon:"none"
				})
				reject(err)
			}
		})
	})
} 
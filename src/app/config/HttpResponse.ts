export class HttpResponse<T> {
	status?:number;
	data?:T;

	constructor(status?:number, data?:T){
		this.data = data;
		this.status = status;
	}
}
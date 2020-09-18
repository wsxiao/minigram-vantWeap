// pages/history/history.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		minDate:new Date(2018, 0,1).getTime(),
		resData:[],
		datePupVisible:false,
		currentDate: '',
		startDateTemp: '',
		endDateTemp:'',
		startDate:'',
		endDate:'',
	},
	currentStartOrEnd: 'start',		// 当前是选择开始还是结束日期

	onClose(){
		this.setData({
			datePupVisible: false
		})
	},

	confirmDate(event){
		let chooseDate = new Date(event.detail)
		var dateTemp = chooseDate.getFullYear() + '-' + (chooseDate.getMonth()+1) + '-' + chooseDate.getDay()
		if(this.currentStartOrEnd == 'start'){
			this.setData({
				startDate: dateTemp,
				datePupVisible: false,
			})
		} else {
			this.setData({
				endDate: dateTemp,
				datePupVisible: false
			})

		}
	},

	openDate(e){
		this.currentStartOrEnd = e.currentTarget.dataset.type
		if(this.currentStartOrEnd == 'start'){
			this.setData({
				currentDate: this.data.startDateTemp
			})

		} else {
			this.setData({
				currentDate: this.data.endDateTemp
			})

		}

		this.setData({
			datePupVisible: true
		})
	},

	xhrGetData(){
		let param = {
			kaishishijian: this.data.startDate,
			jieshushijian: this.data.endDate
		}
		console.log('参数',param)
		let data = [
			{time:'09.11', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 3.4]},
			{time:'09.12', list:[5.2, 2.4, null, null, 8.9, 11.5, 23.5, 13.4]},
			{time:'09.13', list:[5.2, 6.4, null, null, 8.9, 11.5, 5.5, 13.4]},
			{time:'09.14', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 13.4]},
			{time:'09.15', list:[9.2, 9.6, 9.6, null, 8.9, 11.5, 23.5, 11.4]},
			{time:'09.16', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 13.4]},
			{time:'09.17', list:[5.2, 6.4, null, null, 8.9, 11.5, 9.5, 13.4]},
			{time:'09.18', list:[3.2, 6.4, null, 13, 8.9, 11.5, 23.5, 10.4]},
			{time:'09.19', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 13.4]},
			{time:'09.20', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 13.4]},
			{time:'09.21', list:[5.2, 6.4, 15.4, null, 8.9, 11.5, 10.5, 3.4]},
			{time:'09.22', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 13.4]},
			{time:'09.23', list:[5.2, 9.5, null, null, 8.9, 11.5, 3.5, 10.4]},
			{time:'09.24', list:[15.2, 6.4, null, null, 8.9, 11.5, 23.5, 10.6]},
			{time:'09.25', list:[5.2, 6.4, null, null, 8.9, 11.5, 23.5, 13.4]},
		]

		for(let item of data){
			item.listTemp = []
			for(let obj of item.list){
				obj = {
					className:'',
					value: obj || '-'
				}

				if(obj.value < 3.9){
					obj.className = 'grey'
				} else if(obj.value >= 3.9 && obj.value < 6.2){
					obj.className = 'green'
				} else if (obj.value >= 6.2 && obj.value < 9){
					obj.className = 'orange'
				} else if (obj.value >= 9 && obj.value < 15){
					obj.className = 'red'
				} else if (obj.value >= 15){
					obj.className = 'perple'
				}
				item.listTemp.push(obj)
			}
		}
		this.setData({
			resData: data
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var nowDate = new Date();
		var nowDateTemp = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1 )+'-' + nowDate.getDate()

		var oneWeek = new Date(nowDate - 7*24*3600*1000)
		var oneWeekTemp = oneWeek.getFullYear() + '-' + (oneWeek.getMonth()+1) +'-' + oneWeek.getDate()
		this.setData({
			startDate: oneWeekTemp,
			endDate: nowDateTemp,
			startDateTemp: oneWeek.getTime(),
			endDateTemp: nowDate.getTime()
		}, function(){
			this.xhrGetData()
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	
	
})
// pages/question/question.js
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		quesitionInfo:{
			flag: false,
			xingbie:'',
			nianling:'',
			shengao:'',
			tizhong:'',
			tangniaobing:'',
			gaoxueya:'',
		},
		userInfo: {},

		ageList: [],
		heightList:[],
		weightList:[],
		illnessList:['没有糖尿病', '糖尿病前期', 'Ⅰ型糖尿病' ,'Ⅱ型糖尿病', '妊娠型糖尿病', '特殊性糖尿病'],

	},

	clickBtn(e){
		let keyName = 'quesitionInfo.' +  e.currentTarget.dataset.name
		this.setData({
			[keyName]: e.currentTarget.dataset.value
		})
		console.log('确定', keyName , this.data.quesitionInfo.xingbie)
	},

	onConfirm(e){
		let keyName = 'quesitionInfo.' + e.currentTarget.dataset.type;
		this.setData({
			[keyName]: e.detail.value
		})
		console.log('确定', keyName , this.data.quesitionInfo.nianling)
	},

	baseAgeList(){
		let list = []
		for(var i = 1; i<=120; i++){
			list.push(i + '岁')
		}
		this.setData({
			ageList: list
		})
	},

	baseHeightList(){
		let list = []
		for(var i = 30; i<=250; i++){
			list.push(i + 'cm')
		}
		this.setData({
			heightList: list
		})
	},

	baseWeightList(){
		let list = []
		for(var i = 3; i<=150; i++){
			list.push(i + 'kg')
		}
		this.setData({
			weightList: list
		})
	},

	goBack(){
		wx.setStorageSync('userQustionRes',  this.data.quesitionInfo)
		wx.navigateBack()
	},

	agian(){
		let info = {
			flag: true,
			xingbie:'',
			nianling:'',
			shengao:'',
			tizhong:'',
			tangniaobing:'',
			gaoxueya:'',
		}
		this.setData({
			quesitionInfo :info
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		

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
		this.baseAgeList()
		this.baseHeightList()
		this.baseWeightList()

		app.userInfoReadyCallback = res => {
			this.setData({
				userInfo: res.userInfo,
			}, function(){
				console.log('用户信息',this.data.userInfo)
			})
		}
		

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

	}
})
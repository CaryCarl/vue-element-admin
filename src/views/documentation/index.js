import $ from 'jquery'
import ExportJsonExcel from 'js-export-excel'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
export default {
  data: function() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      inputWebUrl: '',
      imgType: [],
      textarea: ``,
      newsObj: {
        title: '标题',
        description: '描述',
        keywords: '关键词'
      }
    }
  },

  mounted() {

  },
  methods: {
    copyClick(content) {
      toClipboard(content)
      this.$message({
			  message: '复制成功！',
			  type: 'success'
      })
    },

    onBtn2() {
      this.$axios.get(`http://api.tianapi.com/webinfo/index?key=eeefea5dcee5a16a039b079f490615a8&url=${this.inputWebUrl}`).then(res => {
        console.log('res---', res)
        if (res.data.code === 200) {
          const newslist = res.data.newslist[0]
          this.newsObj = {
            title: newslist.title,
            description: newslist.description,
            keywords: newslist.keywords
          }
          this.$message({
					  message: '解析成功！',
					  type: 'success'
          })
        } else {
          this.$message({
					  message: '解析失败！',
					  type: 'warning'
          })
        }
      })
    },

    onBtn1() {
      const list = []
      $.each($('.url-body'), function(key, i) {
        console.log(key)
        const title = $(this).find($('.url-info .text-sm').find($('strong')))
        const img = $(this).find($('.url-img img'))
        const msg = $(this).find($('.url-info>p'))
        const href = $(this).find($('.card'))

        list.push({
          id: key,
          title: $(title).html(),
				 img: $(img)[0].src,
          msg: $(msg).html(),
          href: $(href).attr('data-url')
        })
      })
      console.log(list)
      this.exportExcel(list)
    },

    exportExcel(dataList) {
      const option = {} //   option代表的就是excel文件
      const dataTable = [] //   dataTable代表excel文件中的数据内容

      console.log('dataList-1--', dataList)
      if (dataList) {
        console.log('dataList---', dataList)
        dataList.forEach((item, i) => {
          const obj = {
            '序号': item.id,
            '标题': item.title,
            '内容': item.msg,
            '分类': '',
            '网址': item.href,
            '简介': item.msg
          }
          dataTable.push(obj) //   设置excel每列获取的数据源
        })
      }

      option.filename = '导航链接' // excel文件名
      // excel文件数据
      option.datas = [{
        //   excel文件的数据源
        sheetData: dataTable,
        //   excel文件sheet的表名
        sheetName: 'sheet',
        //   excel文件表头名
        sheetHeader: ['序号', '标题', '内容', '分类', '网址', '简介'],
        //   excel文件列名
        sheetFilter: ['序号', '标题', '内容', '分类', '网址', '简介']
      }]
      //   创建ExportJsonExcel实例对象
      const toExcel = new ExportJsonExcel(option)
      //   调用保存方法
      toExcel.saveExcel()
    }
  }
}

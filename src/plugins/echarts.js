import echarts from 'echarts'


const install = function (Vue) {
  // 写法
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get() {
        return {
          chinaMap(id, data) {
            var myecharts = echarts.init(document.getElementById(id))
            var option = {
              // 提示信息,点击弹出的黑框
              tooltip: {
                triggerOn: "click", // 事件类型
                enterable: true, // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
                // data  :对应省市的数据
                formatter(data) {
                  // 视图结构
                  return "<a href='/#/city/" + data.name + "' style='color:#fff'><div><p>" + data.name + "</p><p>现存确诊:" + data.value + "</p></div></a>"
                }
              },
              // 视觉映射组件，用于进行视觉编码，也就是将数据映射到视觉元素
              visualMap: [{
                // 定义为分段型visualMap
                type: 'piecewise',
                pieces: [
                  // 配置颜色区间
                  {
                    min: 0,
                    max: 0,
                    color: "#fff"
                  },
                  {
                    min: 1,
                    max: 10,
                    color: "#FFE1DB"
                  },
                  {
                    min: 11,
                    max: 100,
                    color: "#FE9E83"
                  },
                  {
                    min: 101,
                    max: 500,
                    color: "#E55A4E"
                  },
                  {
                    min: 501,
                    max: 10000,
                    color: "#A52A2A"
                  },

                ]
              }],
              series: [{
                name: "省",
                type: "map", // 配置图表类型
                map: "china", // 中国地图
                roam: false, // 是否允许自动缩放
                zoom: 1.2, // 地图缩放比例
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 8
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: 'rgba(0,255,236,0)',
                    borderColor: 'rgba(0,0,0,0.2)',
                  },
                  emphasis: {
                    areaColor: 'rgba(255,140,0,0.4)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 15,
                    borderWidth: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                  }
                },
                data: data
              }]
            }
            myecharts.setOption(option);
          },

          worldMap(id, data) {
            var myecharts = echarts.init(document.getElementById(id))
            var option = {
              tooltip: {
                triggerOn: "click", // 事件类型
                enterable: true, // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
                formatter(data) {
                  return "<a href='/#/city/" + data.name + "' style='color:#fff'><div><p>" + data.name + "</p><p>现存确诊:" + data.value + "</p></div></a>"
                }
              },
              visualMap: [{
                type: 'piecewise',
                pieces: [
                  // 配置颜色区间
                  {
                    min: 0,
                    max: 0,
                    color: "#fff"
                  },
                  {
                    min: 1,
                    max: 1000,
                    color: "#FFE4E1"
                  },
                  {
                    min: 1001,
                    max: 100000,
                    color: "#FFA07A"
                  },
                  {
                    min: 100001,
                    max: 10000000,
                    color: "#FF0000"
                  },
                  {
                    min: 10000001,
                    max: 1000000000,
                    color: "#A52A2A"
                  },
                  {
                    min: 1000000001,
                    max: 1000000000000,
                    color: "#8B0000"
                  },

                ]
              }],
              series: [{
                name: "世界地图",
                type: "map", // 配置图表类型
                map: "world", // 世界地图
                roam: false, // 是否允许自动缩放
                zoom: 1.0, // 地图缩放比例
                label: {
                  normal: {
                    show: false,
                    textStyle: {
                      fontSize: 8
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: 'rgba(255,165,0,0.1)',
                    borderColor: 'rgba(0,0,0.2)',
                  },
                  emphasis: {
                    areaColor: 'rgba(255,140,0,0.4)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 15,
                    borderWidth: 0,
                    shadowColor: 'rgba(0,0,0,.4)'
                  }
                },
                nameMap: {
                  "Afghanistan": "阿富汗",
                  "Angola": "安哥拉",
                  "Albania": "阿尔巴尼亚",
                  "Algeria": "阿尔及利亚",
                  "Argentina": "阿根廷",
                  "Armenia": "亚美尼亚",
                  "Australia": "澳大利亚",
                  "Austria": "奥地利",
                  "Azerbaijan": "阿塞拜疆",
                  "Bahamas": "巴哈马",
                  "Bangladesh": "孟加拉国",
                  "Belgium": "比利时",
                  "Benin": "贝宁",
                  "Burkina Faso": "布基纳法索",
                  "Burundi": "布隆迪",
                  "Bulgaria": "保加利亚",
                  "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
                  "Belarus": "白俄罗斯",
                  "Belize": "伯利兹",
                  "Bermuda": "百慕大群岛",
                  "Bolivia": "玻利维亚",
                  "Brazil": "巴西",
                  "Brunei": "文莱",
                  "Bhutan": "不丹",
                  "Botswana": "博茨瓦纳",
                  "Cambodia": "柬埔寨",
                  "Cameroon": "喀麦隆",
                  "Canada": "加拿大",
                  "Central African Rep.": "中非共和国",
                  "Chad": "乍得",
                  "Chile": "智利",
                  "China": "中国",
                  "Colombia": "哥伦比亚",
                  "Congo": "刚果",
                  "Costa Rica": "哥斯达黎加",
                  "Côte d'Ivoire": "科特迪瓦",
                  "Croatia": "克罗地亚",
                  "Cuba": "古巴",
                  "Cyprus": "塞浦路斯",
                  "Czech Rep.": "捷克共和国",
                  "Dem. Rep. Korea": "韩国",
                  "Dem. Rep. Congo": "民主刚果",
                  "Denmark": "丹麦",
                  "Djibouti": "吉布提",
                  "Dominican Rep.": "多米尼加共和国",
                  "Ecuador": "厄瓜多尔",
                  "Egypt": "埃及",
                  "El Salvador": "萨尔瓦多",
                  "Eq. Guinea": "赤道几内亚",
                  "Eritrea": "厄立特里亚",
                  "Estonia": "爱沙尼亚",
                  "Ethiopia": "埃塞俄比亚",
                  "Falkland Is.": "福克兰群岛",
                  "Fiji": "斐济",
                  "Finland": "芬兰",
                  "France": "法国",
                  "French Guiana": "法属圭亚那",
                  "Fr. S. Antarctic Lands": "法属南部领地",
                  "Gabon": "加蓬",
                  "Gambia": "冈比亚",
                  "Germany": "德国",
                  "Georgia": "佐治亚州",
                  "Ghana": "加纳",
                  "Greece": "希腊",
                  "Greenland": "格陵兰",
                  "Guatemala": "危地马拉",
                  "Guinea": "几内亚",
                  "Guinea-Bissau": "几内亚比绍",
                  "Guyana": "圭亚那",
                  "Haiti": "海地",
                  "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
                  "Honduras": "洪都拉斯",
                  "Hungary": "匈牙利",
                  "Iceland": "冰岛",
                  "India": "印度",
                  "Indonesia": "印度尼西亚",
                  "Iran": "伊朗",
                  "Iraq": "伊拉克",
                  "Ireland": "爱尔兰",
                  "Israel": "以色列",
                  "Italy": "意大利",
                  "Ivory Coast": "象牙海岸",
                  "Jamaica": "牙买加",
                  "Japan": "日本",
                  "Jordan": "乔丹",
                  "Kashmir": "克什米尔",
                  "Kazakhstan": "哈萨克斯坦",
                  "Kenya": "肯尼亚",
                  "Kosovo": "科索沃",
                  "Kuwait": "科威特",
                  "Kyrgyzstan": "吉尔吉斯斯坦",
                  "Laos": "老挝",
                  "Lao PDR": "老挝人民民主共和国",
                  "Latvia": "拉脱维亚",
                  "Lebanon": "黎巴嫩",
                  "Lesotho": "莱索托",
                  "Liberia": "利比里亚",
                  "Libya": "利比亚",
                  "Lithuania": "立陶宛",
                  "Luxembourg": "卢森堡",
                  "Madagascar": "马达加斯加",
                  "Macedonia": "马其顿",
                  "Malawi": "马拉维",
                  "Malaysia": "马来西亚",
                  "Mali": "马里",
                  "Mauritania": "毛里塔尼亚",
                  "Mexico": "墨西哥",
                  "Moldova": "摩尔多瓦",
                  "Mongolia": "蒙古",
                  "Montenegro": "黑山",
                  "Morocco": "摩洛哥",
                  "Mozambique": "莫桑比克",
                  "Myanmar": "缅甸",
                  "Namibia": "纳米比亚",
                  "Netherlands": "荷兰",
                  "New Caledonia": "新喀里多尼亚",
                  "New Zealand": "新西兰",
                  "Nepal": "尼泊尔",
                  "Nicaragua": "尼加拉瓜",
                  "Niger": "尼日尔",
                  "Nigeria": "尼日利亚",
                  "Korea": "朝鲜",
                  "Northern Cyprus": "北塞浦路斯",
                  "Norway": "挪威",
                  "Oman": "阿曼",
                  "Pakistan": "巴基斯坦",
                  "Panama": "巴拿马",
                  "Papua New Guinea": "巴布亚新几内亚",
                  "Paraguay": "巴拉圭",
                  "Peru": "秘鲁",
                  "Republic of the Congo": "刚果共和国",
                  "Philippines": "菲律宾",
                  "Poland": "波兰",
                  "Portugal": "葡萄牙",
                  "Puerto Rico": "波多黎各",
                  "Qatar": "卡塔尔",
                  "Republic of Seychelles": "塞舌尔共和国",
                  "Romania": "罗马尼亚",
                  "Russia": "俄罗斯",
                  "Rwanda": "卢旺达",
                  "Saint Helena": "圣海伦娜",
                  "Samoa": "萨摩亚",
                  "Saudi Arabia": "沙特阿拉伯",
                  "Seychelles": "塞舌尔",
                  "Senegal": "塞内加尔",
                  "Serbia": "塞尔维亚",
                  "Sierra Leone": "塞拉利昂",
                  "Slovakia": "斯洛伐克",
                  "Slovenia": "斯洛文尼亚",
                  "Solomon Is.": "所罗门群岛",
                  "Somaliland": "索马里兰",
                  "Somalia": "索马里",
                  "South Africa": "南非",
                  "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑德威奇群岛",
                  "S. Sudan": "南苏丹",
                  "Spain": "西班牙",
                  "Sri Lanka": "斯里兰卡",
                  "Sudan": "苏丹",
                  "Suriname": "苏里南",
                  "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
                  "St. Pierre and Miquelon": "圣皮埃尔和密克隆群岛",
                  "Swaziland": "斯威士兰",
                  "Sweden": "瑞典",
                  "Switzerland": "瑞士",
                  "Syria": "叙利亚",
                  "Tajikistan": "塔吉克斯坦",
                  "Tanzania": "坦桑尼亚",
                  "Thailand": "泰国",
                  "The Kingdom of Tonga": "汤加王国",
                  "Timor-Leste": "东帝汶",
                  "Tonga ": "汤加",
                  "Togo": "多哥",
                  "Trinidad and Tobago": "特立尼达和多巴哥",
                  "Turks and Caicos Is.": "特克斯和凯科斯群岛",
                  "Tunisia": "突尼斯",
                  "Turkey": "土耳其",
                  "Turkmenistan": "土库曼斯坦",
                  "Uganda": "乌干达",
                  "Ukraine": "乌克兰",
                  "United Arab Emirates": "阿拉伯联合酋长国",
                  "United Kingdom": "大不列颠联合王国",
                  "United Republic of Tanzania": "坦桑尼亚联合共和国",
                  "United States": "美国",
                  "United States of America": "美利坚合众国",
                  "Uruguay": "乌拉圭",
                  "U.S. Virgin Is.": "圣母玛利亚",
                  "Uzbekistan": "乌兹别克斯坦",
                  "Vanuatu": "瓦努阿图",
                  "Venezuela": "委内瑞拉",
                  "Vietnam": "越南",
                  "West Bank": "西岸",
                  "W. Sahara": "西撒哈拉",
                  "Yemen": "也门",
                  "Zambia": "赞比亚",
                  "Zimbabwe": "津巴布韦",
                },

                data: data
              }],


            }
            myecharts.setOption(option);
          },

          provinceMap(id, cityName, data) {
            //console.log(data);
            var myecharts = echarts.init(document.getElementById(id))
            var option = {
              tooltip: {
                formatter(data) {
                  console.log(data);
                  return "<div><p>" + data.seriesName + ":" + data.name + "</p><p>现存确诊：" + data.value + "</p></div>"
                }
              },
              visualMap: [{   //映射区间
                type: "piecewise",   //分段型
                pieces: [
                  { min: 0, max: 0, color: "#fff" },
                  { min: 1, max: 10, color: "#fdfdcf" },
                  { min: 10, max: 50, color: "#fe9e83" },
                  { min: 50, max: 500, color: "#e55a4e" },
                  { min: 500, max: 1000, color: "#4f070d" },
                ]
              }],
              series: [{
                name: "市",
                type: "map",
                map: cityName,
                roam: false,        //是否允许自动缩放
                zoom: 1.2,          //缩放比例
                label: {
                  //配置基本属性，字体颜色等
                  normal: {
                    show: true,//是否显示字体
                    textStyle: {
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: "#333333"
                    }
                  }
                },
                itemStyle: {         //地图样式
                  normal: {
                    areaColor: "rgba(222,156,83,0)",
                    borderColor: 'rgba(0,0,0,0.4)',
                  },
                  emphasis: {     //阴影效果
                    areaColor: 'rgba(0,0,0,0.3)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.9)'
                  }
                },
                data: data
              }]
            }
            myecharts.setOption(option);
          }
        }
      }
    }
  })
}

export default install;
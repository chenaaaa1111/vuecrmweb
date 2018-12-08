<template>
  <nav class="flex">
    <ul class="inl_b" style="font-family:MicrosoftYaHeiLight;color:#333;">
      <li style="display: inline-block;float: left;background: #D6D9E8;line-height: 40px;font-family:MicrosoftYaHeiLight;color:#333;">显示第 {{(this.currentPage-1)*this.display+1}} 到第 {{this.currentPage*this.display}}条记录，总共 {{this.total}} 条记录 每页显示</li>
      <el-select v-model="value" @change="handleSelect(value)" class="pageSelect" placeholder="12">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
      </el-select>条记录
    </ul>
    <ul class="pagination inl_b">

      <li style="width: 60px;tetx-align:center;border-right:1px solid #ccc;float:left;" :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)" style="width: 60px;tetx-align:center;"> 首页 </a></li>
      <li style="float:left;" :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"style="width: 90px;tetx-align:center;"><span class="el-icon-caret-left">上一页</span></a></li>
      <li style="border-right:1px solid #ccc;float:left;" v-for="p in grouplist" :class="{'active': current == p.val}">
        <a href="javascript:;" @click="setCurrent(p.val)" style="width: 40px;"> {{ p.text }} </a>
      </li>
      <li style="float:left;" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"style="width: 90px;tetx-align:center;">下一页<span class="el-icon-caret-right"></span></a></li>
      <li style="width: 60px;border-left:1px solid #ccc;float:left;" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)" style="width: 60px;tetx-align:center;"> 尾页 </a></li>

    </ul>
  </nav>
</template>

<script type="es6">
  export default {
    data() {
      return {
        current: this.currentPage,//当前页码
        options: [{
          value: '12',
          label: '12'
        }, {
          value: '24',
          label: '24'
        }, {
          value: '36',
          label: '36'
        }, {
          value: '48',
          label: '48'
        }],
        value: ''
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 200
      },
      display: {// 每页显示条数
        type: Number,
        default: 12
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && (center = center + count - idx);
        (this.current > this.page - count) && (center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);
        }
      },
      handleSelect:function(pageSize){
        console.log('handleSelect');
          this.$emit('pageSizeChange', pageSize);
      }
    }
  }
</script>

<style scoped>
  .inl_b {
    display: inline-block;
  }

  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    /*width: 100%;*/
    height: 40px;
    background: #fff;
    border: 1px solid #ccc;
  }

  li {
    /*float: left;*/
    height: 40px;
    /*border-radius: 5px;*/
    /*margin: 3px;*/
    color: #333;
  }

  li:hover {
    background: #F8BD0A;
  }

  li:hover a {
    color: #fff;
  }

  a {
    display: block;
    width: 30px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size:14px;
    font-family:MicrosoftYaHeiLight;
    text-decoration: none;
  }

  .active {
    background: #F8BD0A;
    border-radius: 0 !important;
  }

  .active a {
    color: #fff;
    border-radius: 0 !important;
    height: 40px;

  }

  .flex {
    display: flex;
  }

  .pageSelect {
    width: 13%;
  }

</style>


<template>
  <el-row class="todo-page h-full">
    <el-col
      class="left h-full flex flex-col"
      :span="3"
    >
      <!-- 默认菜单开始 -->
      <div class="default-group-container flex-1">
        <el-menu
          :default-active="$route.path"
          router
        >
          <el-menu-item
            v-for="e of defaultMenuList"
            :key="e.id"
            :index="e.route"
          >
            <i :class="e.icon"></i>
            <span slot="title">{{e.name}}</span>
          </el-menu-item>
        </el-menu>
      </div><!-- 默认菜单结束 -->
      <!-- 分组开始 -->
      <div
        class="group-container flex-1 flex flex-col"
        @contextmenu.prevent="openGroupMenu"
      >
        <div class="head clearfix pt-10px pb-10px">
          <div
            class="icon-unfold fl ml-10px"
            @click="isShowGroup = !isShowGroup"
          >
            <i
              class="el-icon-arrow-down"
              v-show="isShowGroup"
            ></i>
            <i
              class="el-icon-arrow-right"
              v-show="!isShowGroup"
            ></i>
          </div>
          <div class="fl ml-10px">
            <span>清单</span>
          </div>
          <div
            class="icon-plus fr mr-20px"
            @click="openAddGroupDialog"
          >
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div
          class="inner-scroll"
          :class="{'overflow-auto': isShowGroupScroll}"
          @mouseenter="isShowGroupScroll = true"
          @mouseleave="isShowGroupScroll = false"
        >
          <!-- 渲染分组区 start -->
          <el-menu
            :class="{none: !isShowGroup}"
            :default-active="$route.path"
            router
          >
            <template v-if="groupList.length !== 0">
              <el-menu-item
                v-for="e of groupList"
                :groupname="e.groupName"
                :key="e.groupId"
                :index="'/a/' + e.groupId + '/todo'"
              >
                <i :class="e.groupIcon"></i>
                <span slot="title">{{e.groupName}}</span>
              </el-menu-item>
            </template>
          </el-menu><!-- end -->
          <!-- 未创建分组 文本提示区 start -->
          <div
            v-if="groupList.length === 0 && isShowGroup"
            class="flex h-full pl-30px pr-30px justify-center items-center"
          >
            <span class="fs-14px color-grey opacity-50">您还未创建清单</span>
          </div><!-- end -->
          <!-- 收起分组 文本提示区 start -->
          <div
            v-show="!isShowGroup"
            class="flex h-full pl-30px pr-30px justify-center items-center"
          >
            <span class="fs-14px color-grey opacity-50">已收起清单</span>
          </div><!-- end -->
        </div>
      </div><!-- 分组结束 -->
      <!-- 标签开始 -->
      <div
        class="tag-container flex-1 flex flex-col"
        @contextmenu.prevent="openTagMenu"
      >
        <div class="head clearfix">
          <div
            class="icon-unfold fl ml-10px"
            @click="isShowTag = !isShowTag"
          >
            <i
              class="el-icon-arrow-down"
              v-show="isShowTag"
            ></i>
            <i
              class="el-icon-arrow-right"
              v-show="!isShowTag"
            ></i>
          </div>
          <div class="fl ml-10px">
            <span>标签</span>
          </div>
          <div
            class="icon-plus fr mr-20px"
            @click="openAddTagDialog"
          >
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div
          class="inner-scroll"
          :class="{'overflow-auto': isShowTagScroll}"
          @mouseenter="isShowTagScroll = true"
          @mouseleave="isShowTagScroll = false"
        >
          <el-menu
            :class="{none: !isShowTag}"
            ref="tag-list"
            router
            :default-active="$route.path"
          >
            <template v-if="tagList.length !== 0">
              <el-menu-item
                v-for="e of tagList"
                :key="e.tagId"
                :index="'/a/' + e.tagId + '/tag/todo'"
              >
                <i class="el-icon-collection-tag"></i>
                <span slot="title">{{e.tagName}}</span>
              </el-menu-item>
            </template>
          </el-menu>
          <div
            v-if="tagList.length === 0 && isShowTag"
            class="flex h-full pl-30px pr-30px justify-center items-center"
          >
            <span class="fs-14px color-grey opacity-50">您还未创建标签</span>
          </div>
          <div
            v-show="!isShowTag"
            class="flex h-full pl-30px pr-30px justify-center items-center"
          >
            <span class="fs-14px color-grey opacity-50">已收起标签</span>
          </div>
        </div>
      </div><!-- 标签结束 -->
    </el-col>
    <el-col
      class="middle h-full"
      :span="11"
    >
      <router-view :key="$route.path"></router-view>
    </el-col>
    <el-col
      :span="10"
      class="right h-full"
    >
      <TextEditor v-show="isShowTextEditor"></TextEditor>
      <div
        class="relative h-full"
        v-show="!isShowTextEditor"
      >
        <div class="flex flex-1 justify-center items-center h-full">
          <span class="color-grey fs-14px opacity-40">点击待办事项查看详情</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TextEditor from '@/component/TextEditor.vue'

//   { id: 'collect', name: '收集箱', icon: 'el-icon-star-on', route: '/a/collect/todo' },
const defaultMenuData = [
  { id: 'all', name: '全部', icon: 'el-icon-folder', route: '/a/all/todo' },
  { id: 'today', name: '今天', icon: 'el-icon-sunny', route: '/a/today/todo' },
  { id: 'tomorrow', name: '明天', icon: 'el-icon-ship', route: '/a/tomorrow/todo' },
  { id: 'completed', name: '已完成', icon: 'el-icon-circle-check', route: '/a/completed/todo' },
  { id: 'trash', name: '回收站', icon: 'el-icon-delete', route: '/a/trash/todo' }
]

export default {
  name: 'todo-view-comp',

  components: { TextEditor },

  data () {
    return {
      defaultMenuList: defaultMenuData,
      isShowGroup: true,
      isShowGroupScroll: false,
      isShowTag: true,
      isShowTagScroll: false
    }
  },

  methods: {
    openAddGroupDialog () {
      this.$store.commit('toggleAddGroupDialog')
    },
    openAddTagDialog () {
      this.$store.commit('toggleAddTagDialog')
    },
    openGroupMenu () {
      if (this.$store.state.isShowTagMenu) {
        return
      }
      const menuItemDOM = event.composedPath().find(element => {
        return element._prevClass ? element._prevClass.includes('el-menu-item') : undefined
      })
      if (menuItemDOM) {
        const menuItemVue = menuItemDOM.__vue__
        const groupId = menuItemVue.$vnode.data.key
        const groupName = menuItemVue.$vnode.data.attrs.groupname
        sessionStorage.setItem('tempGroup', JSON.stringify({ groupId, groupName }))
        const { clientX, clientY } = event
        if (!this.$store.state.isShowGroupMenu) {
          this.$store.commit('toggleGroupMenu')
          window.addEventListener('click', this.closeGroupMenu) // 利用事件冒泡关闭tag menu
        }
        this.$nextTick(() => {
          const groupMenuComp = document.getElementsByClassName('group-menu')[0].__vue__
          groupMenuComp.$el.style.left = clientX + 'px'
          groupMenuComp.$el.style.top = clientY + 'px'
        })
      }
    },
    closeGroupMenu () {
      if (this.$store.state.isShowGroupMenu) {
        this.$store.commit('toggleGroupMenu')
      }
      window.removeEventListener('click', this.closeGroupMenu)
    },
    openTagMenu () {
      if (this.$store.state.isShowGroupMenu) {
        return
      }
      const tagMenuItem = event.composedPath().find(element => {
        return element._prevClass ? element._prevClass.includes('el-menu-item') : undefined
      })
      if (tagMenuItem) {
        const tagMenuItemVue = tagMenuItem.__vue__
        const tagId = tagMenuItemVue.$vnode.data.key
        sessionStorage.setItem('tempTagId', tagId)
        const { clientX, clientY } = event
        if (!this.$store.state.isShowTagMenu) {
          this.$store.commit('toggleTagMenu')
          window.addEventListener('click', this.closeTagMenu) // 利用事件冒泡关闭tag menu
        }
        this.$nextTick(() => {
          const tagMenuComp = document.getElementsByClassName('tag-menu')[0].__vue__
          tagMenuComp.$el.style.left = clientX + 'px'
          tagMenuComp.$el.style.top = event.clientY > 600 ? clientY - 100 + 'px' : clientY + 'px'
        })
      }
    },
    closeTagMenu () {
      if (this.$store.state.isShowTagMenu) {
        this.$store.commit('toggleTagMenu')
      }
      window.removeEventListener('click', this.closeTagMenu)
    },
    openTextEditor (value) {
      if (!this.isShowTextEditor) {
        this.$store.commit('toggleTextEditor')
      }
    },

    unshiftNewTag (busData) {
      busData ? this.tagList.unshift(busData) : console.log('空的标签数据')
    },

    removeTag (busData) {
      // busData: tagId
      const index = busData ? this.tagList.findIndex(element => busData === element.tagId) : -1
      index === -1 ? console.log('没有指定的标签') : this.tagList.splice(index, 1)
    },

    updateTagName (busData) {
      // busData: { tagId, newTagName }
      const { tagId, newTagName } = busData
      const index = tagId ? this.tagList.findIndex(element => tagId === element.tagId) : -1
      index === -1 ? console.log('没有指定的标签') : this.tagList[index].tagName = newTagName
    }

  },

  created () {
  },

  mounted () {
    // 来自TodoList.vue
    this.$bus.$off('bus-open-texteditor').$on('bus-open-texteditor', this.openTextEditor)
    // 来自AddGroupDialog.vue
    this.$bus.$off('bus-new-group').$on('bus-new-group', this.unshiftNewGroup)
    // 来自AddTagDialog.vue
    this.$bus.$off('bus-new-tag').$on('bus-new-tag', this.unshiftNewTag)
    // 来自TagMenu.vue
    this.$bus.$off('bus-remove-tag').$on('bus-remove-tag', this.removeTag)
    this.$bus.$off('bus-new-tagname').$on('bus-new-tagname', this.updateTagName)
  },

  computed: {
    groupList () {
      const groupList = this.$store.state.groupList
      return groupList || []
    },
    tagList () {
      const tagList = this.$store.state.tagList
      return tagList || []
    },
    isShowTextEditor () {
      return this.$store.state.isShowTextEditor
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/todo/todo.less";
</style>

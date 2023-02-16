const uuid = require('node-uuid/uuid')

const db = require('../db/config')
const {
  createDefaultGroup, sqlAddGroup, sqlGetGroup, sqlUpdateGroupName,
  sqlDeleteGroup, sqlSetTodoGroupIdNull
} = require('../db/sql/groupSql.js')
const { generateDatetime } = require('../util/time')
const { handleQueryResult, printSqlError, setServerErrorReponseResult } = require('../util/public')

// 为用户创建默认待办事项分组
module.exports.initializeGroup = function (userid) {
  const groupId = uuid().split('-').join('').slice(0, 15)
  const createTime = generateDatetime()
  const params = [userid, groupId, '收集箱', 'el-icon-star-on', createTime]
  db.query(createDefaultGroup, params, (error, results) => {
    if (error) {
      console.log(error)
    }
  })
}

// 创建分组 1031
module.exports.addGroupHandler = (request, response) => {
  const { userid } = request.auth
  let { groupName, groupIcon } = request.body
  const { responseResult } = request
  groupIcon = groupIcon ? groupIcon : 'el-icon-star-on'
  const groupId = uuid().split('-').join('').slice(0, 15)
  const createTime = generateDatetime()
  const sqlParams = [userid, groupId, groupName, groupIcon, createTime]
  responseResult.operation = '创建分组'
  db.query(sqlAddGroup, sqlParams, (error, results) => {
    if (error) {
      printSqlError('addGroupHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return responseResult
    }
    if (results.affectedRows === 1) {
      const newGroup = {
        groupId,
        groupName,
        groupIcon,
      }
      responseResult.status = 1031
      responseResult.message = '成功'
      responseResult.data.newGroup = newGroup
      return response.send(responseResult)
    }
  })
}

// 获取分组 1032
module.exports.getGroupHandler = (request, response) => {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取分组'
  db.query(sqlGetGroup, userid, (error, results) => {
    if (error) {
      printSqlError('getGroupHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    responseResult.status = 1032
    const queryResult = handleQueryResult(results)
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但是该用户未创建分组。'
      responseResult.data.groupData = []
      return response.send(responseResult)
    }
    responseResult.message = '查询成功'
    responseResult.data.groupData = queryResult
    return response.send(responseResult)
  })
}

// 修改分组名称 1033
module.exports.updateGroupNameHandler = (request, response) => {
  const { userid } = request.auth
  const { groupId, groupName, newGroupName } = request.body
  const { responseResult } = request
  const sqlParams = [newGroupName, userid, groupId]
  db.query(sqlUpdateGroupName, sqlParams, (error, results) => {
    if (error) {
      printSqlError('updateGroupNameHandler', error)
      setServerErrorReponseResult(responseResult)
      return response.send(responseResult)
    }
    console.log(results)
    if (results.affectedRows === 1) {
      responseResult.status = 1033
      responseResult.message = '修改成功'
      responseResult.data = {
        groupId,
        originalGroupName: groupName,
        newGroupName
      }
      response.send(responseResult)
    } else {
      responseResult.status = -1033
      responseResult.message = '修改失败，原因：无效的groupId'
      response.send(responseResult)
    }
  })
}

function setTodoGroupNull (groupId) {
  db.query(setTodoGroupNull, groupId, (error, results) => {
    if (error) {
      printSqlError('setTodoGroupNull', error)
    }
  })
}

// 删除分组 1034
module.exports.deleteGroupHandler = (request, response) => {
  const { userid } = request.auth
  const { groupId, groupName } = request.body
  const { responseResult } = request
  const sqlParams = [userid, groupId]
  db.query(sqlDeleteGroup, sqlParams, (error, results) => {
    if (error) {
      printSqlError('deleteGroupHandler', error)
      setServerErrorReponseResult(responseResult)
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1034
      responseResult.message = '删除成功'
      responseResult.data = {
        deletedGroupId: groupId,
        deleteGroupName: groupName
      }
      response.send(responseResult)
      setTodoGroupNull(groupId)
    } else {
      responseResult.status = -1034
      responseResult.message = '删除失败，原因：无效的参数groupId'
      response.send(responseResult)
    }
  })
}



class Node {
    constructor(element) {
      this.value = element
      this.next = null
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = new Node('head')
    }
    toString() {
      let targetElement = this.head.next
      const arr = []
      while(targetElement) {
        arr.push(targetElement.value)
        targetElement = targetElement.next
      }
      return arr.join(',')
    }
    findElementByValue(value) {
      let flag = true
      let target = this.head
      while (flag) {
        if (target.value !== value) {
          target = target.next
        } else {
          flag = false
        }
      }
      return target
    }
    lastElement() {
      if(this.checkCircle2()) {
        console.error('存在环，无末尾值')
        return null
      }
      let targetElement = this.head
      while(targetElement.next) {
        if (targetElement.next) {
          targetElement = targetElement.next
        }
      }
      return targetElement
    }
    add(value, targetValue) {
      const targetElement = targetValue ? this.findElementByValue(targetValue) : this.lastElement()
      if (targetElement) {
        const node = new Node(value)
        node.next = targetElement.next
        targetElement.next = node
      }
      return this
    }
    findPre(value) {
      let preElement = null
      let targetElement = this.head
      let flag = true
      while(flag) {
        if (targetElement.value === value) {
          flag = false
        } else {
          preElement = targetElement
          targetElement = targetElement.next
        }
      }
      return preElement
    }
    deleteByValue(value) {
      let preElement = this.head
      let targetElement = this.head.next
      let flag = false
      while(flag) {
        if (targetElement.value === value) {
          preElement.next = targetElement.next
          flag = false
        } else {
          preElement = targetElement
          targetElement = targetElement.next
        }
      }
      return this
    }
    reverseList() {
      const list = new LinkedList()
      let targetElement = this.head.next
      let flag = true
      while (flag) {
        if (targetElement) {
          const node = new Node(targetElement.value)
          node.next = list.head.next
          list.head.next = node
          targetElement = targetElement.next
        } else {
          flag = false
        }
      }
      this.head = list.head
      return this
    }
    checkCircle() {
      let isCircle = false
      let flag = true
      let targetElement = this.head.next
      const map = {}
      while (flag && targetElement) {
        if (map[targetElement.value] === true) {
          flag = false
          isCircle = true
        } else {
          map[targetElement.value] = true
          targetElement = targetElement.next
        }
      }
      return isCircle
    }
    checkCircle2() {
      let fast = this.head.next
      let slow = this.head
      while (fast !== null && fast.next !== null) {
          fast = fast.next.next
          slow = slow.next
          if (slow === fast) return true
      }
      return false
    }
    removeByIndexFromEnd(index) {
      // 翻转链表
      // 正序删除
      // 翻转回来
    }
    findMiddleNode() {
      let fast = this.head
      let slow = this.head
      while (fast.next !== null && fast.next.next !== null) {
          fast = fast.next.next
          slow = slow.next
      }
      console.log(slow)
      return slow
    }
  }
  
  const mergeSortedList = (listA, listB) => {
    let a = listA.head.next
    let b = listB.head.next
    let flag = true
    const list = new LinkedList()
    while(flag) {
      if(a && !b) {
        list.add(a.value)
        flag = false
      } else if (!a && b) {
        list.add(b.value)
        flag = false
      } else if (!a && !b) {
        flag = false
      } else if (a && b) {
        if(a.value > b.value) {
          list.add(b.value)
          b = b.next
        } else {
          list.add(a.value)
          a = a.next
        }
      }
    }
    return list
  }
  
  const assert = require('assert')
  const list1 = new LinkedList()
  list1.add('1').add('2').add('3').add('4').add('5')
  assert.strictEqual(list1.lastElement().value, '5', '末尾值查找不正确')
  assert.strictEqual(list1.findElementByValue('3').value, '3', 'findElementByValue不正确')
  assert.strictEqual(list1.findPre('3').value, '2', 'findPre不正确')
  assert.strictEqual(list1.toString(), list1.reverseList().toString().split(',').reverse().join(','), '翻转不正确')
  
  const list2 = new LinkedList()
  list2.add(1).add(3).add(4).add(8).add(11)
  const list3 = new LinkedList()
  list3.add(2).add(7).add(9).add(10).add(12)
  assert.strictEqual(mergeSortedList(list2, list3).toString(), '1,2,3,4,7,8,9,10,11,12')
  assert.strictEqual(list2.toString(), '1,3,4,8,11')
  assert.strictEqual(list3.toString(), '2,7,9,10,12')
  
  const list4 = new LinkedList()
  list4.add(1).add(2).add(3).add(4).add(5).add(3)
  assert.strictEqual(list4.checkCircle(), true)
  

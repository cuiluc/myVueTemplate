type FuctionObject = {
  [key: string]: Function
}
type FuctionList = Array<FuctionObject>

class Bus {
  eventList: FuctionList = []
  $on(eventName: string, cb: Function) {
    const event = this.eventList.find((item) => item[eventName])
    if (event) {
      event[eventName] = cb
    } else {
      const eventObj = Object.create(null)
      eventObj[eventName] = cb
      this.eventList.push(eventObj)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $emit(eventName: string, ...paramList: any) {
    this.eventList.find((item) => item[eventName])?.[eventName](...paramList)
  }
  $off(eventName: string) {
    const eventIndex = this.eventList.findIndex((item) => item[eventName])
    if(eventIndex !== -1) {
        this.eventList.splice(eventIndex, 1)
    }
  }
}

export default new Bus()


/* 使用
    import Bus from "./bus"

    // A组件
    import Bus from "./bus.js"
    Bus.$emit("father", "title");

    // B组件
    Bus.$on("father", (msg)=>{
        console.log(msg)
    })

    Bus.$off("father")
*/

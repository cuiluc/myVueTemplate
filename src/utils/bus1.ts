type FuctionObject = {
  [key: string]: Function
}
type FuctionList = Array<FuctionObject>
type BusType = {
    eventList: FuctionList,
    $on: Function,
    $emit: Function,
    $off: Function,
}
function useBus() {
  const bus: BusType = {
    eventList: [],
    $on(eventName: string, cb: Function) {
      const event = this.eventList.find((item) => item[eventName])
      if (event) {
        event[eventName] = cb
      } else {
        const eventObj = Object.create(null)
        eventObj[eventName] = cb
        this.eventList.push(eventObj)
      }
    },
    $emit<T>(eventName: string, ...paramList: T) {
      this.eventList.find((item) => item[eventName])?.[eventName](...paramList)
    },
    $off(eventName: string) {
      const eventIndex = this.eventList.findIndex((item) => item[eventName])
      if (eventIndex !== -1) {
        this.eventList.splice(eventIndex, 1)
      }
    }
  }

  return bus
}

export default useBus()

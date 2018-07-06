export class CustomerDayValue {

  constructor(public custid: number, public sensorname: string, public sensorvalue: number, public alertid: number) {
  }
}

export class CustomerMonthValue {

  constructor(public custid: number, public sensorname: string, public sensorvalue: number, public alertid: number) {
  }
}

export class CustomerPreMonthValue {

  constructor(public custid: number, public sensorname: string, public sensorvalue: number, public alertid: number) {
  }
}

export class BillHistory {
  constructor(public month: string, public amount: number, public  status: string) {

  }
}

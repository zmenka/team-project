const PERMISSION_GRANTED = 'granted'

class Notifications {
  supported = false
  granted = false
  alreadyRequested = false

  constructor() {
    if ('Notification' in window) {
      this.supported = true
    }
  }

  sendNotification = async (msg: string) => {
    if (!this.supported) {
      return
    }

    if (!this.granted && !this.alreadyRequested) {
      await this.requestPermission()
    }

    if (this.granted) {
      new Notification(msg)
    }
  }

  requestPermission = async () => {
    await Notification.requestPermission().then(permission => {
      this.granted = permission === PERMISSION_GRANTED
      this.alreadyRequested = true
    })
  }
}

export default new Notifications()

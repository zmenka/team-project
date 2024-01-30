const waitWindowLoad = new Promise(resolve =>
  window.addEventListener('load', resolve)
)

export const register = async (
  swUrl: string,
  options?: RegistrationOptions
) => {
  if ('serviceWorker' in navigator) {
    console.log('!!!!!!!!@@@@@@')
    await waitWindowLoad
    console.log('load')
    try {
      await registerSW(swUrl, options)
    } catch (e) {
      console.error(`Registration failed with ${e}`)
    }
    console.log('end')
  }
}

const isLocalhost = () =>
  Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  )

const registerSW = async (swUrl: string, options?: RegistrationOptions) => {
  const registration = await navigator.serviceWorker.register(swUrl, options)
  if (registration.installing) {
    console.log('Service worker installing')
  } else if (registration.waiting) {
    console.log('Service worker installed')
  } else if (registration.active) {
    console.log('Service worker active')
  }
}

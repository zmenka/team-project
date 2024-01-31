export const register = async (
  swUrl: string,
  options?: RegistrationOptions
) => {
  if ('serviceWorker' in navigator) {
    console.log('register sw')
    window.addEventListener('load', async () => {
      console.log('load')
      try {
        await registerSW(swUrl, options)
        checkIfExist()
      } catch (e) {
        console.error(`Registration failed with ${e}`)
      }
    })
  }
}

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

const checkIfExist = () => {
  if (navigator.serviceWorker.controller) {
    console.log('we have Service worker installed')
  }
}

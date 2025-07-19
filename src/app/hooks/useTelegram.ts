import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          isProgressVisible: boolean
          setText: (text: string) => void
          onClick: (callback: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          showProgress: (leaveActive?: boolean) => void
          hideProgress: () => void
        }
        BackButton: {
          isVisible: boolean
          onClick: (callback: () => void) => void
          show: () => void
          hide: () => void
        }
        initData: string
        initDataUnsafe: {
          query_id?: string
          user?: {
            id: number
            is_bot?: boolean
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            is_premium?: boolean
            added_to_attachment_menu?: boolean
            allows_write_to_pm?: boolean
            photo_url?: string
          }
          receiver?: {
            id: number
            is_bot?: boolean
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            is_premium?: boolean
            added_to_attachment_menu?: boolean
            allows_write_to_pm?: boolean
            photo_url?: string
          }
          chat?: {
            id: number
            type: string
            title?: string
            username?: string
            photo_url?: string
          }
          chat_type?: string
          chat_instance?: string
          start_param?: string
          can_send_after?: number
          auth_date: number
          hash: string
        }
        colorScheme: 'light' | 'dark'
        themeParams: {
          bg_color?: string
          text_color?: string
          hint_color?: string
          link_color?: string
          button_color?: string
          button_text_color?: string
          secondary_bg_color?: string
        }
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        headerColor: string
        backgroundColor: string
        isClosingConfirmationEnabled: boolean
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
        CloudStorage: {
          getItem: (key: string) => Promise<string | null>
          setItem: (key: string, value: string) => Promise<void>
          getItems: (keys: string[]) => Promise<Record<string, string | null>>
          removeItem: (key: string) => Promise<void>
          removeItems: (keys: string[]) => Promise<void>
          getKeys: () => Promise<string[]>
        }
        BiometricManager: {
          isInited: boolean
          isSupported: boolean
          isAvailable: boolean
          isAccessRequested: boolean
          isAccessGranted: boolean
          init: () => Promise<void>
          authenticate: () => Promise<boolean>
          requestAccess: () => Promise<boolean>
        }
        Popup: {
          open: (params: {
            title?: string
            message: string
            buttons?: Array<{
              id?: string
              type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
              text: string
            }>
          }) => Promise<string | undefined>
          close: () => void
        }
        Alert: {
          alert: (message: string, callback?: () => void) => void
          confirm: (message: string, callback?: (confirmed: boolean) => void) => void
        }
        onEvent: (eventType: string, eventHandler: () => void) => void
        offEvent: (eventType: string, eventHandler: () => void) => void
        sendData: (data: string) => void
        switchInlineQuery: (query: string, choose_chat_types?: string[]) => void
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void
        openTelegramLink: (url: string) => void
        openInvoice: (url: string, callback?: (status: string) => void) => void
        showPopup: (params: {
          title?: string
          message: string
          buttons?: Array<{
            id?: string
            type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
            text: string
          }>
        }, callback?: (buttonId: string) => void) => void
        showAlert: (message: string, callback?: () => void) => void
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
        showScanQrPopup: (params: {
          text?: string
        }, callback?: (data: string) => void) => void
        closeScanQrPopup: () => void
        readTextFromClipboard: (callback?: (data: string) => void) => void
        requestWriteAccess: (callback?: (access: boolean) => void) => void
        requestContact: (callback?: (contact: {
          phone_number: string
          first_name: string
          last_name?: string
          user_id?: number
          vcard?: string
        }) => void) => void
        invokeCustomMethod: (method: string, params?: any) => void
        isVersionAtLeast: (version: string) => boolean
        platform: string
        version: string
        isIframe: boolean
        Utils: {
          showPopup: (params: {
            title?: string
            message: string
            buttons?: Array<{
              id?: string
              type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
              text: string
            }>
          }, callback?: (buttonId: string) => void) => void
          showAlert: (message: string, callback?: () => void) => void
          showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
          showScanQrPopup: (params: {
            text?: string
          }, callback?: (data: string) => void) => void
          closeScanQrPopup: () => void
          readTextFromClipboard: (callback?: (data: string) => void) => void
          requestWriteAccess: (callback?: (access: boolean) => void) => void
          requestContact: (callback?: (contact: {
            phone_number: string
            first_name: string
            last_name?: string
            user_id?: number
            vcard?: string
          }) => void) => void
          invokeCustomMethod: (method: string, params?: any) => void
        }
      }
    }
  }
}

export function useTelegram() {
  const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Verifica se o Telegram WebApp está disponível
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      setWebApp(tg)
      
      // Inicializa o WebApp
      tg.ready()
      setIsReady(true)
      
      // Expande o WebApp para ocupar toda a tela
      tg.expand()
    }
  }, [])

  return {
    webApp,
    isReady,
    user: webApp?.initDataUnsafe?.user,
    themeParams: webApp?.themeParams,
    colorScheme: webApp?.colorScheme,
    isExpanded: webApp?.isExpanded,
    viewportHeight: webApp?.viewportHeight,
    viewportStableHeight: webApp?.viewportStableHeight,
  }
} 
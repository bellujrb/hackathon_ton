'use client'

import { useTelegram } from '../hooks/useTelegram'
import { useEffect } from 'react'

export default function TelegramMiniApp() {
  const { webApp, isReady, user, themeParams, colorScheme } = useTelegram()

  useEffect(() => {
    if (webApp && isReady) {
      // Configura o botão principal
      webApp.MainButton.setText('Conectar Carteira')
      webApp.MainButton.show()
      
      // Configura o botão de voltar
      webApp.BackButton.show()
      
      // Configura o callback do botão principal
      webApp.MainButton.onClick(() => {
        webApp.showAlert('Conectando carteira TON...')
        // Aqui você pode adicionar a lógica de conexão com a carteira TON
      })
      
      // Configura o callback do botão de voltar
      webApp.BackButton.onClick(() => {
        webApp.close()
      })
    }
  }, [webApp, isReady])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando Telegram Mini App...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen p-4"
      style={{
        backgroundColor: themeParams?.bg_color || '#ffffff',
        color: themeParams?.text_color || '#000000'
      }}
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">TON Wallet Auth</h1>
          <p className="text-sm opacity-75">
            Conecte sua carteira TON através do Telegram
          </p>
        </div>

        {user && (
          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              {user.photo_url && (
                <img 
                  src={user.photo_url} 
                  alt={user.first_name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">
                  {user.first_name} {user.last_name}
                </h3>
                {user.username && (
                  <p className="text-sm opacity-75">@{user.username}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Informações do App</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plataforma:</span>
                <span>{webApp?.platform}</span>
              </div>
              <div className="flex justify-between">
                <span>Versão:</span>
                <span>{webApp?.version}</span>
              </div>
              <div className="flex justify-between">
                <span>Tema:</span>
                <span className="capitalize">{colorScheme}</span>
              </div>
              <div className="flex justify-between">
                <span>Altura da Viewport:</span>
                <span>{webApp?.viewportHeight}px</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Funcionalidades</h3>
            <div className="space-y-2">
              <button
                onClick={() => webApp?.HapticFeedback.impactOccurred('medium')}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Testar Haptic Feedback
              </button>
              
              <button
                onClick={() => webApp?.showAlert('Esta é uma mensagem de teste!')}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Mostrar Alert
              </button>
              
              <button
                onClick={() => {
                  webApp?.showConfirm('Deseja conectar sua carteira TON?', (confirmed) => {
                    if (confirmed) {
                      webApp.showAlert('Carteira conectada com sucesso!')
                    }
                  })
                }}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Confirmar Ação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
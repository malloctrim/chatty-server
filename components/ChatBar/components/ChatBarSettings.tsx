import {IconFileExport} from "@tabler/icons-react"
import React, {useContext} from "react"
import {useTranslation} from "next-i18next"
import HomeContext from "@/pages/api/home/home.context"
import ChatBarContext from "@/components/ChatBar/ChatBar.context"
import ClearConversations from "@/components/ChatBar/components/ClearConversations"
import PluginKeyList from "@/components/ChatBar/components/PluginKeyList"
import ApiKey from "@/components/Settings/ApiKey"
import ImportData from "@/components/Settings/ImportData"
import UnlockCode from "@/components/Settings/UnlockCode"
import SidebarButton from "@/components/Sidebar/SidebarButton"


export const ChatBarSettings = () => {
  const {t} = useTranslation("sidebar")

  const {
    state: {
      apiKey,
      unlockCode,
      serverSideApiKeyIsSet,
      serverSideUnlockCodeIsSet,
      serverSidePluginKeysSet,
      conversations
    }
  } = useContext(HomeContext)

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportConversations,
    handleApiKeyChange,
    handleUnlockCodeChange
  } = useContext(ChatBarContext)

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? <ClearConversations onClearConversations={handleClearConversations} /> : null}

      <ImportData id="conversations" text={t("Import conversations")} onImport={handleImportConversations} />
      {conversations.length > 0 ? (
        <SidebarButton
          text={t("Export conversations")}
          icon={<IconFileExport size={18} />}
          onClick={() => handleExportConversations()}
        />
      ) : null}
      {!serverSideApiKeyIsSet ? <ApiKey apiKey={apiKey} onApiKeyChange={handleApiKeyChange} /> : null}
      {!serverSidePluginKeysSet ? <PluginKeyList /> : null}
      {serverSideUnlockCodeIsSet ? (
        <UnlockCode unlockCode={unlockCode} onUnlockCodeChange={handleUnlockCodeChange} />
      ) : null}
    </div>
  )
}

export default ChatBarSettings
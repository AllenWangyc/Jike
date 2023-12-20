// fetch channel list

import { useState } from "react"
import { getChannelAPI } from "@/apis/user"
import { useEffect } from "react"

function useChannel() {

  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

  return { channelList }
}

export { useChannel }
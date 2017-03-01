LobbyC.MainMenu = (function (my) {
    //my.setting_logged_with_lable = ["Logged in via : ","Đăng nhập qua : "];
    my.arrayLanguage = {
        en: {
            popup_need_level_to_play_game:{
                text1: "You need to reach level ",
                text2:" to play this game."
            },
            setting_language_lable: {
                text: "English"
            },
            setting_logged_with_lable: {
                text: "Logged in via : "
            },
            setting_logout_lable: {
                text: "Logout"
            },
            setting_login_lable: {
                text: "Login"
            },
            setting_game_option_lable: {
                text: "Game Options"
            },
            setting_back_ground_music_lable: {
                text: "Background Music"
            },
            setting_back_sound_effect_lable: {
                text: "Sound Effects"
            },
            setting_language: {
                text: "Language"
            },
            setting_push_notifi_lable: {
                text: "Push Notification"
            },
            setting_friend_request_lable: {
                text: "Friend Request"
            },
            setting_btn_tearm_lable: {
                text: "Terms of Service"
            },
            setting_btn_privacy_lable: {
                text: "Privacy Policy"
            },
            setting_version_lable: {
                text: "Version"
            },
            footer_collect_lable: {
                text: "Collect"
            },
            footer_collect_time_bonus_in_lable: {
                text: "Time bonus in"
            },
            footer_achievement_lable: {
                text: "Achievements"
            },
            popup_profile_to_level_up_lable: {
                text: " XP\nto level up"
            },
            footer_gift_lable: {
                text: "Gifts"
            },
            header_profile_tooltip: {
                text: "Profile"
            },
            header_invite_tooltip: {
                text: "Invite friends"
            },
            header_sendgift_tooltip: {
                text: "Send gift"
            },
            header_shop_tooltip: {
                text: "Shop"
            },
            header_stardom_tooltip: {
                text: "Stardom"
            },
            header_Level: {
                text: "Lv."
            },
            header_recent_winner_text: {
                text1: "Recent",
                text2: "Winner"
            },
            popup_shop_transaction_cancelled: {
                text: "Transaction Cancelled"
            },
            popup_achievement_title: {
                text: "ACHIEVEMENTS"
            },
            popup_achievement_total_achievement_point: {
                text: "ACHIEVEMENT POINTS"
            },
            popup_achievement_group_title_general: {
                text: "General"
            },
            popup_achievement_group_title_game: {
                text: "Game"
            },
            popup_achievement_group_title_social: {
                text: "Social"
            },
            popup_profile_logo: {
                text: "Profile"
            },
            popup_profile_level: {
                text: "Level"
            },
            popup_profile_rank: {
                text: "Rank"
            },
            popup_profile_MaximumCoins: {
                text: "Maximum Coins"
            },
            popup_profile_PlayedSince: {
                text: "Played Since"
            },
            popup_profile_btn_SendFreeGift: {
                text: "Send Free Gift"
            },
            popup_profile_btn_SendCoins: {
                text: "Send Coins"
            },
            popup_profile_Slot_NumberofJackpot: {
                text: "Number of Jackpot"
            },
            popup_profile_Slot_Win: {
                text: "WIN: "
            },
            popup_profile_Slot_BiggestWin: {
                text: "Biggest Win"
            },
            popup_profile_Slot_TotalSpin: {
                text: "Total Spin"
            },
            popup_profile_Slot_NetProfit: {
                text: "Net Profit"
            },
            popup_profile_Blackjack_NumberofBlackjack: {
                text: "Number of Blackjack"
            },
            popup_profile_Blackjack_PlayedHand: {
                text: "Played Hand"
            },
            popup_profile_Blackjack_BiggestWin: {
                text: "Biggest Win"
            },
            popup_profile_Blackjack_Win: {
                text: "Win"
            },
            popup_profile_Blackjack_NetProfit: {
                text: "Net Profit"
            },
            popup_profile_Change_Avatar: {
                title: "Change Avatar",
                success: "Change Avatar Successfully!",
                fail: "Change Avatar Failed!"
            },
            popup_profile_Blackjack_MaxWinInaRow: {
                text: "Max Win In a Row"
            },
            popup_gift_leaderboard: {
              text: "Leaderboard"
            },
            popup_gift_friends: {
                text: "Friends"
            },
            popup_gift_inbox: {
                text: "Inbox"
            },
            popup_gift_inbox_empty: {
                text: "Your inbox is empty!"
            },
            popup_gift_error_oop: {
                text: "Warning"
            },
            popup_gift_error_message: {
                text: "Please login with your facebook account!"
            },
            popup_gift_select: {
                text: "Please choose at least one friend!"
            },
            popup_gift_success: {
                text: "Success"
            },
            popup_gift_send_free_gift_success: {
                text: "Send free gift successfully!"
            },
            popup_gift_invite_success: {
                text : "Invite successfully!"
            },
            popup_gift_info: {
                text:  " You can get 100,000 coins"
            },
            popup_gift_warning: {
                text: "Warning"
            },
            popup_gift_warning_message: {
                text: " Please try again later"
            },
            popup_gift_accept_success: {
                text: "Accepted gift successfully!"
            },
            popup_gift_anonymous:{
              text: "Anonymous"
            },
            popup_edit_name: {
                title: "Change name",
                fail:"Please type name",
                success:"Change name successfully!",
                reachLimit:"Maximum change name reached"
            },
            popup_change_language: {
                fail:"Fail!",
                success:"Successfully!"
            },
            popup_invite_description: {
                text: "If you send invitation to your friend, you can get $700 per friend"
            },
            popup_invite_tab_FriendtoSendGift: {
                text: "Friends to Send Gift"
            },
            popup_invite_tab_AllFriends: {
                text: "All Friends"
            },
            popup_invite_FriendsSelected: {
                text: "Friends selected"
            },
            popup_invite_btn_UnSelectAll: {
                text: "Un select All"
            },
            popup_invite_btn_SelectAll: {
                text: "Select All"
            },
            popup_invite_btn_SendGift: {
                text: "SEND GIFT"
            },
            popup_invite_btn_Invite: {
                text: "INVITE"
            },
            popup_invite_error_non_select: {
                text: "Please choose at least one friend!"
            },
            popup_invite_tab_GameFriend: {
                text: "Game Friends"
            },
            popup_askfriend_description: {
                text: "You Can Receive Up To 3 Keys Per Day"
            },
            popup_askfriend_btn_label: {
                text: "Ask Friend"
            },
            popup_SendGift_Description: {
                text: "If you send a gift to your friend, you can get $700"
            },
            popup_shop_btn_BuyNow: {
                text: "BUY NOW"
            },
            popup_stardom_level: {
                text: "Level"
            },
            popup_stardom_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_BiggestWin: {
                text: "Biggest Win"
            },
            popup_stardom_JackPot: {
                text: "Jackpot"
            },
            popup_stardom_label_Player: {
                text: "PLAYER"
            },
            popup_stardom_player_AllPlayers: {
                text: "All Players"
            },
            popup_stardom_player_Friends: {
                text: "Friends"
            },
            popup_stardom_player_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_player_NetProfit: {
                text: "Net Profit"
            },
            popup_stardom_player_BiggestWin: {
                text: "Biggest Win"
            },
            popup_stardom_player_Jackpot: {
                text: "Jackpot"
            },
            popup_stardom_player_Ranking: {
                text: "Ranking"
            },
            popup_stardom_player_Players: {
                text: "Players"
            },
            popup_stardom_player_Coins: {
                text: "Coins"
            },
            popup_stardom_player_PlayTogether: {
                text: "Play Together"
            },
            popup_stardom_player_Game: {
                text: "Game"
            },
            popup_secretgift_description: {
                text1: "*WARNING!",
                text2: " Keys purchased from key Shop Will Never Expire"
            },
            popup_smallbox_description: {
                text: "3 Keys Are Required to Open the Box"
            },
            popup_inbox_btn_Accept: {
                text: "ACCEPT"
            },
            popup_inbox_btn_Accept_SendGift: {
                text: "ACCEPT & SEND GIFT"
            },
            popup_inbox_btn_SendKey: {
                text: "Send key"
            },
            popup_inbox_btn_Accept_SendGift_All: {
                text: "Accept & Send gift All"
            },
            popup_inbox_Message_Gift: {
                text1: "I send ",
                text2: " coins to you! Good luck!"
            },
            popup_inbox_Message_FreeGift: {
                text1: "I send a gift up to ",
                text2: " coins to you! Good luck!"
            },
            popup_inbox_Message_SystemGift: {
                text1: "I send a gift up to ",
                text2: " coins to you! Good luck!"
            },
            popup_inbox_Message_Requestkey: {
                text: "Dear, Send Me One Key, Please!"
            },
            popup_inbox_Message_Promote: {
                text1: "Promotion bonus for inviting friend (",
                text2: ") coins"
            },
            popup_inbox_Message_Vip: {
                text: "Promotion bonus for becoming vip"
            },
            popup_inbox_Friend_Benefit: {
                text: "You have received 50,000 coin for inviting a user"
            },
            popup_inbox_Reference_Code: {
                text: "Gift from reference code"
            },
            popup_inbox_Top_Player_Gift: {
                text: "Gift for Top Player"
            },
            popup_inbox_Message_Vip_Up: {
                text: "Congratulate to Vip Up!"
            },
            popup_shop_Vip: {
                text: "Vip"
            },
            popup_shop_Standard: {
                text: "Standard"
            },
            popup_shop_Mobile: {
                text: "Mobile"
            },
            menu_setting_Label: {
                text: "SETTINGS"
            },
            menu_setting_GraphicQuality: {
                text: "Graphic Quality"
            },
            menu_setting_Music: {
                text: "Music"
            },
            menu_setting_Sound: {
                text: "Sound"
            },
            menu_setting_Language: {
                text: "Language"
            },
            popup_voucher_description: {
                text1: "You have been awarded ",
                text2: " coins"
            },
            popup_warning_switch_to_app_fb: {
                text: "Please switch to facebook app to purchase!"
            },
            popup_warning_switch_to_app_fb_to_invite: {
                text: "Please switch to facebook app to invite!"
            },
            popup_warning_switch_to_app_fb_to_send_gift: {
                text: "Please switch to facebook app to send gift!"
            },
            popup_warning_switch_to_app_fb_to_share: {
                text: "Please switch to facebook app to share!"
            },
            share_facebook_levelup: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "Level Up",
                caption: "New Level Achieved in PlayPalace!",
                info: "has successfully leveled up to Level"
            },
            share_facebook_game_unlock: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/game_unlock.png",
                name: "Game Unlock",
                caption: "New Games Unlocked in PlayPalace!",
                info: "has successfully unlocked new games in PlayPalace!"
            },
            popup_user_level_up:{
                text1 : "Level ",
                text2 : " Achieved",
                text3 : "Here's ",
                text4 : " Free Coins For You"
            },
            popup_user_game_unlock:{
                text1 : "Level ",
                text2 : " Achieved",
                text3 : " is now unlocked & available",
                text4 : "Unlock",
                text5 : "Crowns",

                text6: "Unlock By Crown",
                text7: "Unlock this game with ",
                text8: " crowns?",
                text9:" Booster Level Times",
                text10:" Lucky Spin"
            },
            footer_collect_coin: {
                text: "Collect"
            },
            footer_time_bonus:{
                text: "Time bonus in"
            },
            main_menu_not_support_region: {
                text: "Your region is currently not supported"
            },
            body_slot_game_coming_soon: {
                text: "Coming soon"
            },
            popup_inbox_button_accept_all: {
                text: "Accept All"
            },
            ok: {
                text: "OK"
            },
            loginFacebook: {
                text: "Login Facebook"
            },
            collect: {
                text: "Collect"
            },
            collectAndShare: {
                text: "Collect & Share"
            },
            cancel: {
                text: "Cancel"
            },
            buyNow: {
                text: "Buy now"
            },
            goToLobby: {
                text: "Go to lobby"
            },
            send: {
                text: "Send"
            },
            voucher_has_expired: {
                text: "Voucher has expired"
            },
            voucher_has_already_been_redeemed: {
                text: "Voucher has already been redeemed"
            },
            you_have_unlocked_a_new_game: {
                text: "You have unlocked a new game"
            },
            crown_purchase_successfully: {
                text: "Crown purchase successfully. Please wait for our game server to process this payment"
            },
            coin_purchase_successfully: {
                text: "Coin purchase successfully. Please wait for our game server to process this payment"
            },
            new_game_tile: {
                text: "New content coming soon"
            },
            new_game_description: {
                text: "We are working hard to bring you new content"
            },
            cant_get_image:{
                text: "You can't get this image!"
            },
            download_remove:{
                message_download: " will start downloading shortly. Meanwhile you can play other available games. A Wi-Fi connection is recommended to download the slot, 3G/LTE charges may apply.",
                info_remove: "Remove a game anytime by pressing and holding it down",
                download: "DOWNLOAD",
                remove: "REMOVE",
                stop: "STOP",
                continue: "CONTINUE",
                wait_to_download: "Please wait while game data is downloaded. ",
                download_soon: " will be downloaded soon!",
                downloading: "Downloading resources for ",
                cancle_download: ". Do you want to cancel this download?",
                update: "UPDATE",
                message_update: "The resource of this game needs to be updated. Do you want to update now?",
                message_remove: "Game will start deleting shortly.",
                delete_failed: "Delete game failed."
            },
            exit_game:{
                title: "Exit confirm",
                message: "Do you want to stop playing?"
            },
            not_enough_space:{
                text: "Your device does not have enough storage space."
            },
            login_some_where:{
                text: "Your account has been logged in from another device.\nClick ok to reload."
            },
            cant_get_data_FB:{
                text: "Cannot get data from facebook.\nPlease try again later."
            },
            FB_token_expired:{
                text: "Your facebook token has been expired.\nPlease reload app."
            },
            purchased:{
                approved: "Purchase approved!",
                reward: "Your reward is: ",
                payment_accepted: "Your payment is accepted!",
                support: "If you don't receive coins, please contact admin for support!",
                not_available: "Product is not available right now!"
            },
            free_coin:{
                received: "Received",
                play_fail: "You cannot play video at this time. Please try again later.",
                title: "Free coin"
            }
        },
        cn: {
            popup_need_level_to_play_game:{
                text1: "你需要达到的水平 ",
                text2:" 玩这个游戏。"
            },
            setting_language_lable: {
                text: "简体"
            },
            setting_logged_with_lable: {
                text: "登录通过："
            },
            setting_logout_lable: {
                text: "登出"
            },
            setting_login_lable: {
                text: "登录"
            },
            setting_game_option_lable: {
                text: "游戏选项"
            },
            setting_back_ground_music_lable: {
                text: "背景音乐"
            },
            setting_back_sound_effect_lable: {
                text: "音效"
            },
            setting_language: {
                text: "语言"
            },
            setting_push_notifi_lable: {
                text: "推送通知"
            },
            setting_friend_request_lable: {
                text: "好友请求"
            },
            setting_btn_tearm_lable: {
                text: "服务期限"
            },
            setting_btn_privacy_lable: {
                text: "隐私政策"
            },
            setting_version_lable: {
                text: "版"
            },
            footer_collect_lable: {
                text: "搜集"
            },
            footer_collect_time_bonus_in_lable: {
                text: "时间奖金"
            },
            footer_achievement_lable: {
                text: "成就"
            },
            popup_profile_to_level_up_lable: {
                text: " XP\n就可以升級了"
            },
            footer_gift_lable: {
                text: "礼品"
            },
            header_profile_tooltip: {
                text: "玩家简介"
            },
            header_invite_tooltip: {
                text: "邀请好友"
            },
            header_sendgift_tooltip: {
                text: "送礼"
            },
            header_shop_tooltip: {
                text: "商店"
            },
            header_stardom_tooltip: {
                text: "排行榜"
            },
            header_Level: {
                text: "等级"
            },
            header_recent_winner_text: {
                text1: "近期",
                text2: "赢家"
            },
            popup_shop_transaction_cancelled: {
                text: "交易取消"
            },
            popup_achievement_title: {
                text: "成就"
            },
            popup_achievement_total_achievement_point: {
                text: "成就点数"
            },
            popup_achievement_group_title_general: {
                text: "一般"
            },
            popup_achievement_group_title_game: {
                text: "游戏"
            },
            popup_achievement_group_title_social: {
                text: "社会"
            },
            popup_profile_logo: {
                text: "玩家简介"
            },
            popup_profile_level: {
                text: "等级"
            },
            popup_profile_rank: {
                text: "排名"
            },
            popup_profile_MaximumCoins: {
                text: "金币余额"
            },
            popup_profile_PlayedSince: {
                text: "加入日期"
            },
            popup_profile_btn_SendFreeGift: {
                text: "发送免费赠送"
            },
            popup_profile_btn_SendCoins: {
                text: "送金币"
            },
            popup_profile_Slot_NumberofJackpot: {
                text: "头奖次数"
            },
            popup_profile_Slot_Win: {
                text: "赢: "
            },
            popup_profile_Slot_BiggestWin: {
                text: "最大奖金"
            },
            popup_profile_Slot_TotalSpin: {
                text: "拉杆次数"
            },
            popup_profile_Slot_NetProfit: {
                text: "净利"
            },
            popup_profile_Blackjack_NumberofBlackjack: {
                text: "二十一点次数"
            },
            popup_profile_Blackjack_PlayedHand: {
                text: "玩过手数"
            },
            popup_profile_Blackjack_BiggestWin: {
                text: "最大奖金"
            },
            popup_profile_Blackjack_Win: {
                text: "赢"
            },
            popup_profile_Blackjack_NetProfit: {
                text: "净利"
            },
            popup_profile_Change_Avatar: {
                title: "修改頭像",
                success: "更改头像成功!",
                fail: "更改头像失败!"
            },
            popup_profile_Blackjack_MaxWinInaRow: {
                text: "不断取得的胜数"
            },
            popup_gift_leaderboard: {
                text: "排行榜"
            },
            popup_gift_friends: {
                text: "友"
            },
            popup_gift_inbox: {
                text: "收件箱"
            },
            popup_gift_inbox_empty: {
                text: "您的收件箱是空的!"
            },
            popup_gift_error_oop: {
                text: "警告"
            },
            popup_gift_error_message: {
                text: "请与您的Facebook帐户登录!"
            },
            popup_gift_select: {
                text: "请至少选择一个朋友!"
            },
            popup_gift_success: {
                text: "成功"
            },
            popup_gift_send_free_gift_success: {
                text: "发送免费赠送的成功!"
            },
            popup_gift_invite_success: {
                text : "邀请成功!"
            },
            popup_gift_info: {
                text:  " 你可以得到100000金币"
            },
            popup_gift_warning: {
                text: "警告"
            },
            popup_gift_warning_message: {
                text: " 请稍后再试"
            },
            popup_gift_accept_success: {
                text: "成功接受!"
            },
            popup_gift_anonymous:{
                text: "匿名"
            },
            popup_edit_name: {
                title: "更换名字",
                fail:"请输入名称",
                success:"更改名称成功",
                reachLimit:"最大改变名称达成"
            },
            popup_change_language: {
                fail:"失败!",
                success:"成功!"
            },
            popup_invite_description: {
                text: "当你发送邀请给您的朋友时，每个朋友您邀请， 你将得到700金币"
            },
            popup_invite_tab_FriendtoSendGift: {
                text: "邀请好友送礼"
            },
            popup_invite_tab_AllFriends: {
                text: "所有好友"
            },
            popup_invite_FriendsSelected: {
                text: "好友选定"
            },
            popup_invite_btn_UnSelectAll: {
                text: "取消所有选择"
            },
            popup_invite_btn_SelectAll: {
                text: "选择所有"
            },
            popup_invite_btn_SendGift: {
                text: "发送礼品"
            },
            popup_invite_btn_Invite: {
                text: "邀请"
            },
            popup_invite_error_non_select: {
                text: "请至少选择一个朋友!"
            },
            popup_invite_tab_GameFriend: {
                text: "游戏好友"
            },
            popup_askfriend_description: {
                text: "你每天能获得高达3把钥匙"
            },
            popup_askfriend_btn_label: {
                text: "好友求助"
            },
            popup_SendGift_Description: {
                text: "当你发送邀请给您的朋友时， 每个朋友您邀请， 你将得到700金币"
            },
            popup_shop_btn_BuyNow: {
                text: "立即购买"
            },
            popup_stardom_level: {
                text: "等级"
            },
            popup_stardom_BankRoll: {
                text: "资金"
            },
            popup_stardom_BiggestWin: {
                text: "最大奖金"
            },
            popup_stardom_JackPot: {
                text: "头奖"
            },
            popup_stardom_label_Player: {
                text: "玩家"
            },
            popup_stardom_player_AllPlayers: {
                text: "所有玩家"
            },
            popup_stardom_player_Friends: {
                text: "好友"
            },
            popup_stardom_player_BankRoll: {
                text: "资金"
            },
            popup_stardom_player_NetProfit: {
                text: "净利"
            },
            popup_stardom_player_BiggestWin: {
                text: "最大奖金"
            },
            popup_stardom_player_Jackpot: {
                text: "头奖"
            },
            popup_stardom_player_Ranking: {
                text: "排名"
            },
            popup_stardom_player_Players: {
                text: "玩家"
            },
            popup_stardom_player_Coins: {
                text: "金币"
            },
            popup_stardom_player_PlayTogether: {
                text: "同场竞技"
            },
            popup_stardom_player_Game: {
                text: "游戏"
            },
            popup_secretgift_description: {
                text1: "*请注意!",
                text2: " 你购买的锁匙不会过期"
            },
            popup_smallbox_description: {
                text: "你需要三把锁匙来打开箱子"
            },
            popup_inbox_btn_Accept: {
                text: "接受"
            },
            popup_inbox_btn_Accept_SendGift: {
                text: "接受并送礼"
            },
            popup_inbox_btn_SendKey: {
                text: "发送钥匙"
            },
            popup_inbox_btn_Accept_SendGift_All: {
                text: "接受并送礼给所有好友"
            },
            popup_inbox_Message_Gift: {
                text1: "我送 ",
                text2: " 金币给你! 祝你好运!"
            },
            popup_inbox_Message_FreeGift: {
                text1: "我送 ",
                text2: " 金币给你! 祝你好运!"
            },
            popup_inbox_Message_SystemGift: {
                text1: "我送 ",
                text2: " 金币给你! 祝你好运!"
            },
            popup_inbox_Message_Requestkey: {
                text: "好友, 请送我一把钥匙, 谢谢!"
            },
            popup_inbox_Message_Promote: {
                text1: "谢谢你邀请您的好友，这是您的促销奖金。",
                text2: ") 金币"
            },
            popup_inbox_Message_Vip: {
                text: "谢谢你成为我们的贵宾。请接受这分促销奖金。"
            },
            popup_inbox_Friend_Benefit: {
                text: "您已收到5萬元用於邀請用戶"
            },
            popup_inbox_Reference_Code: {
                text: "从参考代码礼物"
            },
            popup_inbox_Top_Player_Gift: {
                text: "頂級球員的禮物"
            },
            popup_inbox_Message_Vip_Up: {
                text: "祝贺贵宾起来!"
            },
            popup_shop_Vip: {
                text: "贵宾"
            },
            popup_shop_Standard: {
                text: "标准"
            },
            popup_shop_Mobile: {
                text: "移动"
            },
            menu_setting_Label: {
                text: "设置"
            },
            menu_setting_GraphicQuality: {
                text: "图形质量"
            },
            menu_setting_Music: {
                text: "音乐"
            },
            menu_setting_Sound: {
                text: "音响"
            },
            menu_setting_Language: {
                text: "语言"
            },
            popup_voucher_description: {
                text1: "你将获得 ",
                text2: " 金币"
            },
            share_facebook_levelup: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "升级！",
                caption: "在PlayPalace里成功的升级！",
                info: "在PlayPalace里成功的升级到"
            },
            share_facebook_game_unlock: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/game_unlock.png",
                name: "解开新游戏！",
                caption: "在PlayPalace里解开新游戏！",
                info: "在PlayPalace里成功的解开新游戏！"
            },
            popup_user_level_up:{
                text1 : "水平 ",
                text2 : "实现",
                text3 : "这里的 ",
                text4 : "免费硬币您"
            },
            popup_user_game_unlock:{
                text1 : "水平 ",
                text2 : "实现",
                text3 : "现在解锁和可用",
                text4 : "开锁",
                text5 : "冠",

                text6: "解除由冠",
                text7: "解开这个游戏 ",
                text8: " 冠？",
                text9:" 升壓級時間",
                text10:"  幸運旋轉"
            },
            popup_warning_switch_to_app_fb: {
                text: "请通过应用去在Facebook上付出 ！"
            },
            popup_warning_switch_to_app_fb_to_invite: {
                text: "请切换到Facebook应用程序邀请 ！"
            },
            popup_warning_switch_to_app_fb_to_send_gift: {
                text: "请通过应用去在Facebook上送礼品 ！"
            },
            popup_warning_switch_to_app_fb_to_share: {
                text: "请切换到Facebook应用程序共享!"
            },
            main_menu_not_support_region: {
                text: "您所在的地区目前不支持"
            },
            body_slot_game_coming_soon: {
                text: "快来了"
            },
            popup_inbox_button_accept_all: {
                text: "全都接受"
            },
            ok: {
                text: "好"
            },
            loginFacebook: {
                text: "登录 Facebook"
            },
            collect: {
                text: "搜集"
            },
            collectAndShare: {
                text: "收集及分享"
            },
            cancel: {
                text: "取消"
            },
            buyNow: {
                text: "立即购买"
            },
            goToLobby: {
                text: "去游说"
            },
            send: {
                text: "发送"
            },
            voucher_has_expired: {
                text: "券已过期"
            },
            voucher_has_already_been_redeemed: {
                text: "券已兑现"
            },
            you_have_unlocked_a_new_game: {
                text: "你已经解锁一个新的游戏"
            },
            crown_purchase_successfully: {
                text: "皇冠成功购买。请等待我们的游戏服务器处理此项付款"
            },
            coin_purchase_successfully: {
                text: "硬币成功购买。请等待我们的游戏服务器处理此项付款"
            },
            new_game_tile: {
                text: "新内容即将推出"
            },
            new_game_description: {
                text: "我们正在努力为您带来新的内容"
            },
            cant_get_image:{
                text: "你不能得到這個圖片!"
            },
            download_remove:{
                message_download: " 很快就會開始下載。同時，你可以玩其他可用的遊戲。一個Wi-Fi連接，推薦下載插槽，可申請3G / LTE收費。",
                info_remove: "任何時候按下並按住它刪除遊戲",
                download: "下載",
                remove: "去掉",
                stop: "停",
                continue: "繼續",
                wait_to_download: "請稍候，遊戲數據被下載。",
                download_soon: " 即將下載！",
                downloading: "下載資源 ",
                cancle_download: "。你想取消這個下載？",
                update: "現代化",
                message_update: "需要更新這個遊戲的資源。你想立即更新嗎？",
                message_remove: "遊戲將開始刪除郵件。",
                delete_failed: "刪除遊戲失敗。"
            },
            exit_game:{
                title: "確認退出",
                message: "你想停止播放？"
            },
            not_enough_space:{
                text: "您的設備沒有足夠的存儲空間。"
            },
            login_some_where:{
                text: "您的帳戶已經從其他設備登錄。\n單擊確定重新加載。"
            },
            cant_get_data_FB:{
                text: "無法從Facebook獲取數據。\n請稍後再試。"
            },
            FB_token_expired:{
                text: "您的Facebook令牌已過期。\n請重新加載應用程序。"
            },
            purchased:{
                approved: "採購批准！",
                reward: "您的獎勵是：",
                payment_accepted: "您的付款被接受！",
                support: "如果您沒有收到硬幣，請聯繫管理員的支持！",
                not_available: "產品目前無法使用！"
            },
            free_coin:{
                received: "收到",
                play_fail: "你不能在這個時候播放視頻。 請稍後再試。",
                title: "免費硬幣"
            }
        },
        trad_cn: {
            popup_need_level_to_play_game:{
                text1: "你需要達到的水平 ",
                text2:" 玩這個遊戲。"
            },
            setting_language_lable: {
                text: "繁體"
            },
            setting_logged_with_lable: {
                text: "登錄通過： "
            },
            setting_logout_lable: {
                text: "登出"
            },
            setting_login_lable: {
                text: "登錄"
            },
            setting_game_option_lable: {
                text: "遊戲選項"
            },
            setting_back_ground_music_lable: {
                text: "背景音樂"
            },
            setting_back_sound_effect_lable: {
                text: "音效"
            },
            setting_language: {
                text: "語言"
            },
            setting_push_notifi_lable: {
                text: "推送通知"
            },
            setting_friend_request_lable: {
                text: "好友請求"
            },
            setting_btn_tearm_lable: {
                text: "服務期限"
            },
            setting_btn_privacy_lable: {
                text: "隱私政策"
            },
            setting_version_lable: {
                text: "版"
            },
            footer_collect_lable: {
                text: "蒐集"
            },
            footer_collect_time_bonus_in_lable: {
                text: "時間獎金"
            },
            footer_achievement_lable: {
                text: "成就"
            },
            popup_profile_to_level_up_lable: {
                text: " XP\n就可以升级了"
            },
            footer_gift_lable: {
                text: "禮品"
            },
            header_profile_tooltip: {
                text: "玩家簡介"
            },
            header_invite_tooltip: {
                text: "邀請好友"
            },
            header_sendgift_tooltip: {
                text: "送禮"
            },
            header_shop_tooltip: {
                text: "商店"
            },
            header_stardom_tooltip: {
                text: "排行榜"
            },
            header_Level: {
                text: "等級"
            },
            header_recent_winner_text: {
                text1: "近期",
                text2: "贏家"
            },
            popup_shop_transaction_cancelled: {
                text: "交易取消"
            },
            popup_achievement_title: {
                text: "成就"
            },
            popup_achievement_total_achievement_point: {
                text: "成就點數"
            },
            popup_achievement_group_title_general: {
                text: "一般"
            },
            popup_achievement_group_title_game: {
                text: "遊戲"
            },
            popup_achievement_group_title_social: {
                text: "社會"
            },
            popup_profile_logo: {
                text: "玩家簡介"
            },
            popup_profile_level: {
                text: "等級"
            },
            popup_profile_rank: {
                text: "排名"
            },
            popup_profile_MaximumCoins: {
                text: "金幣餘額"
            },
            popup_profile_PlayedSince: {
                text: "加入日期"
            },
            popup_profile_btn_SendFreeGift: {
                text: "發送免費贈送"
            },
            popup_profile_btn_SendCoins: {
                text: "送金幣"
            },
            popup_profile_Slot_NumberofJackpot: {
                text: "頭獎次數"
            },
            popup_profile_Slot_Win: {
                text: "贏: "
            },
            popup_profile_Slot_BiggestWin: {
                text: "最大獎金"
            },
            popup_profile_Slot_TotalSpin: {
                text: "拉桿次數"
            },
            popup_profile_Slot_NetProfit: {
                text: "淨利"
            },
            popup_profile_Blackjack_NumberofBlackjack: {
                text: "二十一點次數"
            },
            popup_profile_Blackjack_PlayedHand: {
                text: "玩過手數"
            },
            popup_profile_Blackjack_BiggestWin: {
                text: "最大獎金"
            },
            popup_profile_Blackjack_Win: {
                text: "贏"
            },
            popup_profile_Blackjack_NetProfit: {
                text: "淨利"
            },
            popup_profile_Change_Avatar: {
                title: "修改头像",
                success: "更改头像成功！",
                fail: "更改头像失败！"
            },
            popup_profile_Blackjack_MaxWinInaRow: {
                text: "不斷取得的勝數"
            },
            popup_gift_leaderboard: {
                text: "排行榜"
            },
            popup_gift_friends: {
                text: "友"
            },
            popup_gift_inbox: {
                text: "收件箱"
            },
            popup_gift_inbox_empty: {
                text: "您的收件箱是空的!"
            },
            popup_gift_error_oop: {
                text: "警告"
            },
            popup_gift_error_message: {
                text: "請與您的Facebook帳戶登錄!"
            },
            popup_gift_select: {
                text: "請至少選擇一個朋友!"
            },
            popup_gift_success: {
                text: "成功"
            },
            popup_gift_send_free_gift_success: {
                text: "發送免費贈送的成功!"
            },
            popup_gift_invite_success: {
                text : "邀請成功!"
            },
            popup_gift_info: {
                text:  " 你可以得到100000金幣"
            },
            popup_gift_warning: {
                text: "警告"
            },
            popup_gift_warning_message: {
                text: " 請稍後再試"
            },
            popup_gift_accept_success: {
                text: "成功接受!"
            },
            popup_gift_anonymous:{
                text: "匿名"
            },
            popup_edit_name: {
                title: "更換名字",
                fail:"請輸入名稱",
                success:"更改名稱成功",
                reachLimit:"最大改變名稱達成"
            },
            popup_change_language: {
                fail:"失敗!",
                success:"成功!"
            },
            popup_invite_description: {
                text: "當你發送邀請給您的朋友時，每個朋友您邀請， 你將得到700金幣"
            },
            popup_invite_tab_FriendtoSendGift: {
                text: "邀請好友送禮"
            },
            popup_invite_tab_AllFriends: {
                text: "所有好友"
            },
            popup_invite_FriendsSelected: {
                text: "好友選定"
            },
            popup_invite_btn_UnSelectAll: {
                text: "取消所有選擇"
            },
            popup_invite_btn_SelectAll: {
                text: "選擇所有"
            },
            popup_invite_btn_SendGift: {
                text: "發送禮品"
            },
            popup_invite_btn_Invite: {
                text: "邀請"
            },
            popup_invite_error_non_select: {
                text: "請至少選擇一個朋友!"
            },
            popup_invite_tab_GameFriend: {
                text: "遊戲好友"
            },
            popup_askfriend_description: {
                text: "你每天能獲得高達3把鑰匙"
            },
            popup_askfriend_btn_label: {
                text: "好友求助"
            },
            popup_SendGift_Description: {
                text: "當你發送邀請給您的朋友時， 每個朋友您邀請， 你將得到700金幣"
            },
            popup_shop_btn_BuyNow: {
                text: "立即購買"
            },
            popup_stardom_level: {
                text: "等級"
            },
            popup_stardom_BankRoll: {
                text: "資金"
            },
            popup_stardom_BiggestWin: {
                text: "最大獎金"
            },
            popup_stardom_JackPot: {
                text: "頭獎"
            },
            popup_stardom_label_Player: {
                text: "玩家"
            },
            popup_stardom_player_AllPlayers: {
                text: "所有玩家"
            },
            popup_stardom_player_Friends: {
                text: "好友"
            },
            popup_stardom_player_BankRoll: {
                text: "資金"
            },
            popup_stardom_player_NetProfit: {
                text: "淨利"
            },
            popup_stardom_player_BiggestWin: {
                text: "最大獎金"
            },
            popup_stardom_player_Jackpot: {
                text: "頭獎"
            },
            popup_stardom_player_Ranking: {
                text: "排名"
            },
            popup_stardom_player_Players: {
                text: "玩家"
            },
            popup_stardom_player_Coins: {
                text: "金幣"
            },
            popup_stardom_player_PlayTogether: {
                text: "同場競技"
            },
            popup_stardom_player_Game: {
                text: "遊戲"
            },
            popup_secretgift_description: {
                text1: "*請注意!",
                text2: " 你購買的鎖匙不會過期"
            },
            popup_smallbox_description: {
                text: "你需要三把鎖匙來打開箱子"
            },
            popup_inbox_btn_Accept: {
                text: "接受"
            },
            popup_inbox_btn_Accept_SendGift: {
                text: "接受並送禮"
            },
            popup_inbox_btn_SendKey: {
                text: "發送鑰匙"
            },
            popup_inbox_btn_Accept_SendGift_All: {
                text: "接受並送禮給所有好友"
            },
            popup_inbox_Message_Gift: {
                text1: "我送 ",
                text2: "金幣給你! 祝你好運!"
            },
            popup_inbox_Message_FreeGift: {
                text1: "我送 ",
                text2: "金幣給你! 祝你好運!"
            },
            popup_inbox_Message_SystemGift: {
                text1: "我送 ",
                text2: "金幣給你! 祝你好運!"
            },
            popup_inbox_Message_Requestkey: {
                text: "好友, 請送我一把鑰匙, 謝謝!"
            },
            popup_inbox_Message_Promote: {
                text1: "謝謝你邀請您的好友，這是您的促銷獎金。",
                text2: ")金幣"
            },
            popup_inbox_Message_Vip: {
                text: "謝謝你成為我們的貴賓。請接受這分促銷獎金。"
            },
            popup_inbox_Friend_Benefit: {
                text: "您已收到5万元用于邀请用户"
            },
            popup_inbox_Reference_Code: {
                text: "從參考代碼禮物"
            },
            popup_inbox_Top_Player_Gift: {
                text: "顶级球员的礼物"
            },
            popup_inbox_Message_Vip_Up: {
                text: "祝賀貴賓最多!"
            },
            popup_shop_Vip: {
                text: "貴賓"
            },
            popup_shop_Standard: {
                text: "標準"
            },
            popup_shop_Mobile: {
                text: "移動"
            },
            menu_setting_Label: {
                text: "設置"
            },
            menu_setting_GraphicQuality: {
                text: "圖形質量"
            },
            menu_setting_Music: {
                text: "音樂"
            },
            menu_setting_Sound: {
                text: "音響"
            },
            menu_setting_Language: {
                text: "語言"
            },
            popup_voucher_description: {
                text1: "你將獲得 ",
                text2: " 金幣"
            },
            share_facebook_levelup: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "升級！",
                caption: "在PlayPalace裡獲得新的級別！",
                info: "在PlayPalace裡成功的升級到"
            },
            share_facebook_game_unlock: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/game_unlock.png",
                name: "解開新遊戲！",
                caption: "在PlayPalace裡解開新遊戲！",
                info: "在PlayPalace裡成功的解開新遊戲！"
            },
            popup_user_level_up:{
                text1 : "水平 ",
                text2 : " 實現",
                text3 : "這裡的 ",
                text4 : " 免費硬幣您"
            },
            popup_user_game_unlock:{
                text1 : "水平 ",
                text2 : " 實現",
                text3 : " 現在解鎖和可用",
                text4 : "開鎖",
                text5 : "冠",

                text6: "解除由冠",
                text7: "解開這個遊戲 ",
                text8: " 冠？",
                text9:" 升压级时间",
                text10:" 幸运旋转"
            },
            popup_warning_switch_to_app_fb: {
                text: "请通过应用去在Facebook上付出 ！"
            },
            popup_warning_switch_to_app_fb_to_invite: {
                text: "請切換到Facebook應用程序邀請 ！"
            },
            popup_warning_switch_to_app_fb_to_send_gift: {
                text: "請通過應用去在Facebook上送禮品 ！"
            },
            popup_warning_switch_to_app_fb_to_share: {
                text: "請切換到Facebook應用程序共享!"
            },
            footer_collect_coin: {
                text: "蒐集"
            },
            footer_time_bonus:{
                text: "時間獎金"
            },
            main_menu_not_support_region: {
                text: "您所在的地區目前不支持"
            },
            body_slot_game_coming_soon: {
                text: "快來了"
            },
            popup_inbox_button_accept_all: {
                text: "全都接受"
            },
            ok: {
                text: "好"
            },
            loginFacebook: {
                text: "登錄 Facebook"
            },
            collect: {
                text: "蒐集"
            },
            collectAndShare: {
                text: "收集及分享"
            },
            cancel: {
                text: "取消"
            },
            buyNow: {
                text: "立即購買"
            },
            goToLobby: {
                text: "去遊說"
            },
            send: {
                text: "發送"
            },
            voucher_has_expired: {
                text: "券已過期"
            },
            voucher_has_already_been_redeemed: {
                text: "券已兌現"
            },
            you_have_unlocked_a_new_game: {
                text: "你已經解鎖一個新的遊戲"
            },
            crown_purchase_successfully: {
                text: "皇冠成功購買。請等待我們的遊戲服務器處理此項付款"
            },
            coin_purchase_successfully: {
                text: "硬幣成功購買。請等待我們的遊戲服務器處理此項付款"
            },
            new_game_tile: {
                text: "新內容即將推出"
            },
            new_game_description: {
                text: "我們正在努力為您帶來新的內容"
            },
            cant_get_image:{
                text: "你不能得到这个图片!"
            },
            download_remove:{
                message_download: " 很快就会开始下载。同时，你可以玩其他可用的游戏。一个Wi-Fi连接，推荐下载插槽，可申请3G / LTE收费。",
                info_remove: "任何时候按下并按住它删除游戏",
                download: "下载",
                remove: "去掉",
                stop: "停",
                continue: "继续",
                wait_to_download: "请稍候，游戏数据被下载。",
                download_soon: " 即将下载！",
                downloading: "下载资源 ",
                cancle_download: "。你想取消这个下载？",
                update: "现代化",
                message_update: "需要更新这个游戏的资源。你想立即更新吗？",
                message_remove: "游戏将开始删除邮件。",
                delete_failed: "删除游戏失败。"
            },
            exit_game:{
                title: "确认退出",
                message: "你想停止播放？"
            },
            not_enough_space:{
                text: "您的设备没有足够的存储空间。"
            },
            login_some_where:{
                text: "您的帐户已经从其他设备登录。\n单击确定重新加载。"
            },
            cant_get_data_FB:{
                text: "无法从Facebook获取数据。\n请稍后再试。"
            },
            FB_token_expired:{
                text: "您的Facebook令牌已过期。\n请重新加载应用程序。"
            },
            purchased:{
                approved: "采购批准！",
                reward: "您的奖励是：",
                payment_accepted: "您的付款被接受！",
                support: "如果您没有收到硬币，请联系管理员的支持！",
                not_available: "产品目前无法使用！"
            },
            free_coin:{
                received: "收到",
                play_fail: "你不能在这个时候播放视频。 请稍后再试。",
                title: "免费硬币"
            }
        },
        vn: {
            popup_need_level_to_play_game:{
                text1: "Bạn cần đạt đến level ",
                text2:" để chơi game này."
            },
            setting_language_lable: {
                text: "Tiếng Việt"
            },
            setting_logged_with_lable: {
                text: "Đăng nhập qua : "
            },
            setting_logout_lable: {
                text: "Đăng xuất"
            },
            setting_login_lable: {
                text: "Đăng nhập"
            },
            setting_game_option_lable: {
                text: "Tùy chọn"
            },
            setting_back_ground_music_lable: {
                text: "Nhạc nền"
            },
            setting_back_sound_effect_lable: {
                text: "Âm thanh"
            },
            setting_language: {
                text: "Ngôn ngữ"
            },
            setting_push_notifi_lable: {
                text: "Thông báo"
            },
            setting_friend_request_lable: {
                text: "Yêu cầu bạn bè"
            },
            setting_btn_tearm_lable: {
                text: "Điều khoản"
            },
            setting_btn_privacy_lable: {
                text: "Chính sách bảo mật"
            },
            setting_version_lable: {
                text: "Phiên bản"
            },
            footer_collect_lable: {
                text: "Nhận"
            },
            footer_collect_time_bonus_in_lable: {
                text: "Nhận trong"
            },
            footer_achievement_lable: {
                text: "Thành tựu"
            },
            footer_gift_lable: {
                text: "Quà"
            },
            popup_profile_to_level_up_lable: {
                text: " XP\nđể lên cấp"
            },
            header_profile_tooltip: {
                text: "Thông tin"
            },
            header_invite_tooltip: {
                text: "Mời bạn"
            },
            header_sendgift_tooltip: {
                text: "Tặng quà"
            },
            header_shop_tooltip: {
                text: "Cửa hàng"
            },
            header_stardom_tooltip: {
                text: "Stardom"
            },
            header_Level: {
                text: "Lv."
            },
            header_recent_winner_text: {
                text1: "Người",
                text2: "thắng"
            },
            popup_shop_transaction_cancelled: {
                text: "Giao dịch bị hủy"
            },
            popup_achievement_title: {
                text: "Thành Tựu"
            },
            popup_achievement_total_achievement_point: {
                text: "ĐIỂM THÀNH TỰU"
            },
            popup_achievement_group_title_general: {
                text: "Tổng hợp"
            },
            popup_achievement_group_title_game: {
                text: "Trò chơi"
            },
            popup_achievement_group_title_social: {
                text: "Xã hội"
            },
            popup_profile_logo: {
                text: "Thông tin"
            },
            popup_profile_level: {
                text: "Cấp"
            },
            popup_profile_rank: {
                text: "Hạng"
            },
            popup_profile_MaximumCoins: {
                text: "Tổng tiền"
            },
            popup_profile_PlayedSince: {
                text: "Ngày tham gia"
            },
            popup_profile_btn_SendFreeGift: {
                text: "Tặng quà"
            },
            popup_profile_btn_SendCoins: {
                text: "Gửi tiền"
            },
            popup_profile_Slot_NumberofJackpot: {
                text: "Number of Jackpot"
            },
            popup_profile_Slot_Win: {
                text: "Thắng: "
            },
            popup_profile_Slot_BiggestWin: {
                text: "Thắng lớn nhất"
            },
            popup_profile_Slot_TotalSpin: {
                text: "Tổng số lần quay"
            },
            popup_profile_Slot_NetProfit: {
                text: "Lợi nhuận:"
            },
            popup_profile_Blackjack_NumberofBlackjack: {
                text: "Số lần Xì-dách"
            },
            popup_profile_Blackjack_PlayedHand: {
                text: "Tay chơi"
            },
            popup_profile_Blackjack_BiggestWin: {
                text: "Thắng lớn nhất"
            },
            popup_profile_Blackjack_Win: {
                text: "Thắng"
            },
            popup_profile_Blackjack_NetProfit: {
                text: "Lợi nhuận"
            },
            popup_profile_Change_Avatar: {
                title: "Đổi Avatar",
                success: "Thay avatar thành công",
                fail: "Thay avatar thất bại"
            },
            popup_profile_Blackjack_MaxWinInaRow: {
                text: "Thắng lớn nhất trong một hàng"
            },
            popup_gift_leaderboard: {
                text: "Bảng dẫn đầu"
            },
            popup_gift_friends: {
                text: "Bạn bè"
            },
            popup_gift_inbox: {
                text: "Tin đã nhận"
            },
            popup_gift_inbox_empty: {
                text: "Không có tin nhắn!"
            },
            popup_gift_error_oop: {
                text: "Cảnh báo"
            },
            popup_gift_error_message: {
                text: "Hãy đăng nhập với tài khoản facebook của bạn!"
            },
            popup_gift_select: {
                text: "Vui lòng chọn ít nhất một người bạn!"
            },
            popup_gift_success: {
                text: "Thành công"
            },
            popup_gift_send_free_gift_success: {
                text: "Tặng quà thành công!"
            },
            popup_gift_invite_success: {
                text : "Mời thành công!"
            },
            popup_gift_info: {
                text:  " Có thể nhận 100,000 đồng"
            },
            popup_gift_warning: {
                text: "Cảnh báo"
            },
            popup_gift_warning_message: {
                text: " Làm ơn thử lại lần nữa!"
            },
            popup_gift_accept_success: {
                text: "Chấp nhận thành công!"
            },
            popup_gift_anonymous:{
                text: "Ẩn danh"
            },
            popup_edit_name: {
                title: "Đổi tên",
                fail:"Vui lòng nhập tên",
                success:"Đổi tên thành công",
                reachLimit:"Bạn đã quá số lần đổi tên"
            },
            popup_change_language: {
                fail:"Thất bại!",
                success:"Thành công!"
            },
            popup_invite_description: {
                text: "Nếu bạn gửi thư mời cho bạn bè của bạn, bạn có thể nhận được $ 700 từ mỗi người bạn"
            },
            popup_invite_tab_FriendtoSendGift: {
                text: "Bạn để tặng quà"
            },
            popup_invite_tab_AllFriends: {
                text: "Tất cả"
            },
            popup_invite_FriendsSelected: {
                text: "Đã chọn"
            },
            popup_invite_btn_UnSelectAll: {
                text: "Hủy chọn"
            },
            popup_invite_btn_SelectAll: {
                text: "Chọn hết"
            },
            popup_invite_btn_SendGift: {
                text: "Gửi quà"
            },
            popup_invite_btn_Invite: {
                text: "Mời"
            },
            popup_invite_error_non_select: {
                text: "Vui lòng chọn ít nhất một người bạn!"
            },
            popup_invite_tab_GameFriend: {
                text: "Bạn game"
            },
            popup_askfriend_description: {
                text: "Bạn có thể nhận được lên đến 3 Keys mỗi ngày"
            },
            popup_askfriend_btn_label: {
                text: "Yêu cầu"
            },
            popup_SendGift_Description: {
                text: "Nếu bạn gửi một món quà cho bạn bè của bạn, bạn có thể nhận được 700 $"
            },
            popup_shop_btn_BuyNow: {
                text: "MUA NGAY"
            },
            popup_stardom_level: {
                text: "Cấp"
            },
            popup_stardom_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_BiggestWin: {
                text: "Biggest Win"
            },
            popup_stardom_JackPot: {
                text: "Jackpot"
            },
            popup_stardom_label_Player: {
                text: "NGƯỜI CHƠI"
            },
            popup_stardom_player_AllPlayers: {
                text: "Tất cả"
            },
            popup_stardom_player_Friends: {
                text: "Bạn"
            },
            popup_stardom_player_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_player_NetProfit: {
                text: "Lợi nhuận"
            },
            popup_stardom_player_BiggestWin: {
                text: "Thắng lớn nhất"
            },
            popup_stardom_player_Jackpot: {
                text: "Jackpot"
            },
            popup_stardom_player_Ranking: {
                text: "Hạng"
            },
            popup_stardom_player_Players: {
                text: "Người chơi"
            },
            popup_stardom_player_Coins: {
                text: "Tiền"
            },
            popup_stardom_player_PlayTogether: {
                text: "Cùng chơi"
            },
            popup_stardom_player_Game: {
                text: "Game"
            },
            popup_secretgift_description: {
                text1: "*Cảnh báo!",
                text2: " Chìa khóa đã mua tồn tại vĩnh viễn"
            },
            popup_smallbox_description: {
                text: "Cần 3 khóa để mở thùng"
            },
            popup_inbox_btn_Accept: {
                text: "Đồng ý"
            },
            popup_inbox_btn_Accept_SendGift: {
                text: "Đồng ý & gửi quà"
            },
            popup_inbox_btn_SendKey: {
                text: "Gửi key"
            },
            popup_inbox_btn_Accept_SendGift_All: {
                text: "Đồng ý và gửi tất cả quà"
            },
            popup_inbox_Message_Gift: {
                text1: "Tôi đã gửi ",
                text2: " đồng cho bạn! Good luck!"
            },
            popup_inbox_Message_FreeGift: {
                text1: "Tôi đã gửi ",
                text2: " đồng cho bạn! Good luck!"
            },
            popup_inbox_Message_SystemGift: {
                text1: "Tôi đã gửi ",
                text2: " đồng cho bạn! Good luck!"
            },
            popup_inbox_Message_Requestkey: {
                text: "Gửi cho mình 1 key nhé!"
            },
            popup_inbox_Message_Promote: {
                text1: "Tiền tặng từ hệ thống (",
                text2: ") đồng"
            },
            popup_inbox_Message_Vip: {
                text: "Chúc mừng bạn đã thành vip"
            },
            popup_inbox_Friend_Benefit: {
                text: "Bạn nhận được 50,000 coin nhờ mời 1 user "
            },
            popup_inbox_Reference_Code: {
                text: "Quà từ reference code"
            },
            popup_inbox_Top_Player_Gift: {
                text: "Quà tặng Top Player"
            },
            popup_shop_Vip: {
                text: "Vip"
            },
            popup_shop_Standard: {
                text: "Standard"
            },
            popup_shop_Mobile: {
                text: "Mobile"
            },
            popup_warning_switch_to_app_fb: {
                text: "Xin hãy chuyển qua ứng dụng trên facebook \n để thanh toán!"
            },
            popup_warning_switch_to_app_fb_to_invite: {
                text: "Xin hãy chuyển qua ứng dụng trên facebook \n để mời!"
            },
            popup_warning_switch_to_app_fb_to_send_gift: {
                text: "Xin hãy chuyển qua ứng dụng trên facebook \n để gửi quà!"
            },
            popup_warning_switch_to_app_fb_to_share: {
                text: "Xin hãy chuyển qua ứng dụng trên facebook \n để chia sẽ!"
            },
            menu_setting_Label: {
                text: "TÙY CHỈNH"
            },
            menu_setting_GraphicQuality: {
                text: "Hình ảnh"
            },
            menu_setting_Music: {
                text: "Nhạc nền"
            },
            menu_setting_Sound: {
                text: "Âm thanh"
            },
            menu_setting_Language: {
                text: "Ngôn ngữ"
            },
            popup_voucher_description: {
                text1: "Bạn đã được tặng ",
                text2: " đồng"
            },
            share_facebook_levelup: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "Lên cấp",
                caption: "Bạn đã lên cấp!",
                info: "đã đạt tới cấp"
            },
            share_facebook_game_unlock: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/game_unlock.png",
                name: "Mở game",
                caption: "Một game mới đã được mở PlayPalace!",
                info: "một game đã mở thành công trong PlayPalace!"
            },
            popup_user_level_up:{
                text1 : "Cấp ",
                text2 : " Đạt được",
                text3 : "Here's ",
                text4 : " Tiền tặng cho bạn"
            },
            popup_user_game_unlock:{
                text1 : "Cấp ",
                text2 : " Đạt được",
                text3 : " đã được mở",
                text4 : "Mở khóa",
                text5 : "Crowns",

                text6: "Mở khóa bằng Crown",
                text7: "Mở khóa với ",
                text8: " crowns?",
                text9:" giờ tăng exp",
                text10:" vòng quay may mắn"
            },
            footer_collect_coin: {
                text: "Nhận"
            },
            footer_time_bonus:{
                text: "Nhận trong"
            },
            main_menu_not_support_region: {
                text: "Tính năng này không hỗ trợ tại đất nước bạn!"
            },
            body_slot_game_coming_soon: {
                text: "Sắp có"
            },
            popup_inbox_button_accept_all: {
                text: "Nhận tất cả"
            },
            ok: {
                text: "OK"
            },
            loginFacebook: {
                text: "Đăng nhập Facebook"
            },
            collect: {
                text: "Nhận"
            },
            collectAndShare: {
                text: "Nhận & Chia sẻ"
            },
            cancel: {
                text: "Hủy"
            },
            buyNow: {
                text: "Mua ngay"
            },
            goToLobby: {
                text: "Trở lại lobby"
            },
            send: {
                text: "Gửi"
            },
            voucher_has_expired: {
                text: "Voucher hết hạn"
            },
            voucher_has_already_been_redeemed: {
                text: "Voucher đã được sử dụng"
            },
            you_have_unlocked_a_new_game: {
                text: "Bạn đã mở khóa một game"
            },
            crown_purchase_successfully: {
                text: "Mua vương miện thành công. Vui lòng đợi game server xử lý lượt giao dịch này"
            },
            coin_purchase_successfully: {
                text: "Mua tiền thành công. Vui lòng đợi game server xử lý lượt giao dịch này"
            },
            new_game_tile: {
                text: "Sắp có game mới"
            },
            new_game_description: {
                text: "Chúng tôi đang cố gắng làm game mới"
            },
            cant_get_image:{
                text: "Bạn không thể lấy được hình này!"
            },
            download_remove:{
                message_download: " sẽ được tải về ngay. Trong lúc đó, bạn có thể chơi game khác có sẵn. Khuyến khích nên sử dụng WIFI để tải game, phí 3G/LTE có thể áp dụng.",
                info_remove: "Xóa một game bất cứ lúc nào bằng cách nhấn và giữ nó xuống",
                download: "TẢI",
                remove: "XÓA",
                stop: "DỪNG",
                continue: "TIẾP TỤC",
                wait_to_download: "Xin vui lòng chờ trong khi dữ liệu đang được tải về. ",
                download_soon: " sẽ được tải sau!",
                downloading: "Đang tải dữ liệu game ",
                cancle_download: ". Bạn muốn dừng việc tải này lại?",
                update: "CẬP NHẬT",
                message_update: "Dữ liệu của trò chơi này cần được cập nhật. Bạn có muốn cập nhật bây giờ?",
                message_remove: "Game sẽ được xóa ngay.",
                delete_failed: "Xóa thất bại."
            },
            exit_game:{
                title: "Xác nhận",
                message: "Bạn muốn thoát khỏi game?"
            },
            not_enough_space:{
                text: "Thiết bị của bạn không đủ dung lượng bộ nhớ cần thiết"
            },
            login_some_where:{
                text: "Tài khoản của bạn đã được đăng nhập từ một thiết bị khác.\nClick OK để tải lại."
            },
            cant_get_data_FB:{
                text: "Không thể lấy dữ liệu từ Facebook.\nVui lòng thử lại sau."
            },
            FB_token_expired:{
                text: "Thẻ Facebook của bạn đã hết hạn.\nXin hãy tải lại ứng dụng."
            },
            purchased:{
                approved: "Giao dịch hoàn tất",
                reward: "Phần thưởng của bạn: ",
                payment_accepted: "Thanh toán của bạn được chấp nhận",
                support: "Nếu bạn không nhận dược xu, xin vui lòng liên hệ với quản trị viên để được hỗ trợ.",
                not_available: "Sản phẩm không có sẵn vào lúc này"
            },
            free_coin:{
                received: "Đã nhận",
                play_fail: "Bạn không thể chơi video vào lúc này. Xin hãy thử lại.",
                title: "Xu miễn phí"
            }
        },
        my: {
            popup_need_level_to_play_game:{
                text1: "Anda perlu untuk mencapai tahap ",
                text2:" untuk bermain permainan ini."
            },
            setting_language_lable: {
                text: "B-Malay"
            },
            setting_logged_with_lable: {
                text: "Log masuk melalui: "
            },
            setting_logout_lable: {
                text: "Log keluar"
            },
            setting_login_lable: {
                text: "Log masuk"
            },
            setting_game_option_lable: {
                text: "Permainan Pilihan"
            },
            setting_back_ground_music_lable: {
                text: "Muzik latar"
            },
            setting_back_sound_effect_lable: {
                text: "Kesan bunyi"
            },
            setting_language: {
                text: "Bahasa"
            },
            setting_push_notifi_lable: {
                text: "Pemberitahuan push"
            },
            setting_friend_request_lable: {
                text: "Kawan Permintaan"
            },
            setting_btn_tearm_lable: {
                text: "Syarat Perkhidmatan"
            },
            setting_btn_privacy_lable: {
                text: "Dasar Privasi"
            },
            setting_version_lable: {
                text: "versi"
            },
            footer_collect_lable: {
                text: "mengumpul"
            },
            footer_collect_time_bonus_in_lable: {
                text: "bonus masa dalam"
            },
            footer_achievement_lable: {
                text: "Pencapaian"
            },
            popup_profile_to_level_up_lable: {
                text: " XP\nke tahap"
            },
            footer_gift_lable: {
                text: "Gifts"
            },
            header_profile_tooltip: {
                text: "Profil"
            },
            header_invite_tooltip: {
                text: "Undang Kawan"
            },
            header_sendgift_tooltip: {
                text: "Hantar hadiah"
            },
            header_shop_tooltip: {
                text: "Shop"
            },
            header_stardom_tooltip: {
                text: "Stardom"
            },
            header_Level: {
                text: "Level."
            },
            header_recent_winner_text: {
                text1: "Baru baru ini",
                text2: "Pemenang"
            },
            popup_shop_transaction_cancelled: {
                text: "Transaksi Dibatalkan"
            },
            popup_achievement_title: {
                text: "PENCAPAIAN"
            },
            popup_achievement_total_achievement_point: {
                text: "POINTS PENCAPAIAN"
            },
            popup_achievement_group_title_general: {
                text: "General"
            },
            popup_achievement_group_title_game: {
                text: "Permainan"
            },
            popup_achievement_group_title_social: {
                text: "Sosial"
            },
            popup_profile_logo: {
                text: "Profil"
            },
            popup_profile_level: {
                text: "Level"
            },
            popup_profile_rank: {
                text: "Ranking"
            },
            popup_profile_MaximumCoins: {
                text: "Maksimum koins"
            },
            popup_profile_PlayedSince: {
                text: "Bermain semenjak"
            },
            popup_profile_btn_SendFreeGift: {
                text: "Menghantar Hadiah Percuma"
            },
            popup_profile_btn_SendCoins: {
                text: "Menghantar Koin"
            },
            popup_profile_Slot_NumberofJackpot: {
                text: "Bilangan Jackpot"
            },
            popup_profile_Slot_Win: {
                text: "Kemenangan: "
            },
            popup_profile_Slot_BiggestWin: {
                text: "Kemenangan Terbesar"
            },
            popup_profile_Slot_TotalSpin: {
                text: "Jumlah total Spin"
            },
            popup_profile_Slot_NetProfit: {
                text: "Keuntungan Bersih"
            },
            popup_profile_Blackjack_NumberofBlackjack: {
                text: "Bilangan Blackjack"
            },
            popup_profile_Blackjack_PlayedHand: {
                text: "Tangan Pemain"
            },
            popup_profile_Blackjack_BiggestWin: {
                text: "Pemenang Terbesar"
            },
            popup_profile_Blackjack_Win: {
                text: "Kemenangan"
            },
            popup_profile_Blackjack_NetProfit: {
                text: "Keuntungan Bersih"
            },
            popup_profile_Change_Avatar: {
                title: "Tukar Avatar",
                success: "Keberhasilan",
                fail: "Gagal"
            },
            popup_profile_Blackjack_MaxWinInaRow: {
                text: "Maksimum kemenangan berturut turut"
            },
            popup_gift_leaderboard: {
                text: "Leaderboard"
            },
            popup_gift_friends: {
                text: "Kawan"
            },
            popup_gift_inbox: {
                text: "Peti masuk"
            },
            popup_gift_inbox_empty: {
                text: "Peti masuk anda kosong!"
            },
            popup_gift_error_oop: {
                text: "Amaran"
            },
            popup_gift_error_message: {
                text: "Sila log masuk dengan akaun facebook anda!"
            },
            popup_gift_select: {
                text: "Sila pilih sekurang-kurangnya satu rakan!"
            },
            popup_gift_success: {
                text: "Kejayaan"
            },
            popup_gift_send_free_gift_success: {
                text: "Menghantar kejayaan hadiah percuma !"
            },
            popup_gift_invite_success: {
                text : "Jemput berjaya!"
            },
            popup_gift_info: {
                text:  " Boleh 100,000 syiling"
            },
            popup_gift_warning: {
                text: "Amaran"
            },
            popup_gift_warning_message: {
                text: " Sila cuba sebentar lagi"
            },
            popup_gift_accept_success: {
                text: "terima berjaya!"
            },
            popup_gift_anonymous:{
                text: "Anonymous"
            },
            popup_edit_name: {
                title: "Tukar nama",
                fail:"Sila taip nama",
                success:"kejayaan Tukar nama",
                reachLimit:"nama perubahan maksimum yang tercapai"
            },
            popup_change_language: {
                fail:"Gagal!",
                success:"Kejayaan!"
            },
            popup_invite_description: {
                text: "Jika anda menghantar jemputan kepada kawan anda, anda boleh mendapat $ 700 setiap kawan"
            },
            popup_invite_tab_FriendtoSendGift: {
                text: "Kawan untuk menghantar hadiah"
            },
            popup_invite_tab_AllFriends: {
                text: "Semua kawan"
            },
            popup_invite_FriendsSelected: {
                text: "Kawan terpilih"
            },
            popup_invite_btn_UnSelectAll: {
                text: "Jangan pilih semuanya"
            },
            popup_invite_btn_SelectAll: {
                text: "Pilih semuanya"
            },
            popup_invite_btn_SendGift: {
                text: "Menghantar hadiah"
            },
            popup_invite_btn_Invite: {
                text: "Mengundang"
            },
            popup_invite_error_non_select: {
                text: "Sila pilih sekurang-kurangnya satu rakan!"
            },
            popup_invite_tab_GameFriend: {
                text: "Game Friends"
            },
            popup_askfriend_description: {
                text: "Anda dapat menerima maksimal 3 kunci per hari"
            },
            popup_askfriend_btn_label: {
                text: "Tanya kawan"
            },
            popup_SendGift_Description: {
                text: "Jika anda menghantar hadiah kepada kawan anda , anda boleh  mendapatkan $ 700"
            },
            popup_shop_btn_BuyNow: {
                text: "Beli Sekarang"
            },
            popup_stardom_level: {
                text: "Level"
            },
            popup_stardom_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_BiggestWin: {
                text: "Pemenang Terbesar"
            },
            popup_stardom_JackPot: {
                text: "Jackpot"
            },
            popup_stardom_label_Player: {
                text: "Pemain"
            },
            popup_stardom_player_AllPlayers: {
                text: "Semua pemain"
            },
            popup_stardom_player_Friends: {
                text: "Rakan rakan"
            },
            popup_stardom_player_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_player_NetProfit: {
                text: "Keuntungan Bersih"
            },
            popup_stardom_player_BiggestWin: {
                text: "Pemenang Terbesar"
            },
            popup_stardom_player_Jackpot: {
                text: "Jackpot"
            },
            popup_stardom_player_Ranking: {
                text: "Ranking"
            },
            popup_stardom_player_Players: {
                text: "Para Pemain"
            },
            popup_stardom_player_Coins: {
                text: "Koins"
            },
            popup_stardom_player_PlayTogether: {
                text: "Bermain bersama"
            },
            popup_stardom_player_Game: {
                text: "Permainan"
            },
            popup_secretgift_description: {
                text1: "*Peringatan!",
                text2: " Kunci yang dibeli dari Shop Key tidak akan tamat tempoh"
            },
            popup_smallbox_description: {
                text: "3 Kunci diperlukan untuk membuka  Kotak"
            },
            popup_inbox_btn_Accept: {
                text: "Menerima"
            },
            popup_inbox_btn_Accept_SendGift: {
                text: "Menerima dan menghantar hadiah"
            },
            popup_inbox_btn_SendKey: {
                text: "Mengirimkan Kunci"
            },
            popup_inbox_btn_Accept_SendGift_All: {
                text: "Menerima dan menghantar hadiah"
            },
            popup_inbox_Message_Gift: {
                text1: "Saya hantar ",
                text2: " Koin untuk anda, Semoga anda beruntung!"
            },
            popup_inbox_Message_FreeGift: {
                text1: "Saya hantarkan hadiah hingga  ",
                text2: " Koin untuk anda, Semoga anda beruntung!"
            },
            popup_inbox_Message_SystemGift: {
                text1: "Saya hantarkan hadiah hingga  ",
                text2: " Koin untuk anda, Semoga anda beruntung!"
            },
            popup_inbox_Message_Requestkey: {
                text: "Mohon hantarkan 1 kunci!"
            },
            popup_inbox_Message_Promote: {
                text1: "Bonus promosi untuk mengundang kawan (",
                text2: ") koins"
            },
            popup_inbox_Message_Vip: {
                text: "Bonus promosi untuk menjadi VIP"
            },
            popup_inbox_Friend_Benefit: {
                text: "Anda telah menerima 50,000 syiling untuk menjemput pengguna"
            },
            popup_inbox_Reference_Code: {
                text: "Hadiah daripada kod rujukan"
            },
            popup_inbox_Top_Player_Gift: {
                text: "Hadiah untuk Top Player"
            },
            popup_inbox_Message_Vip_Up: {
                text: "Mengucapkan tahniah ke Vip Up!"
            },
            popup_shop_Vip: {
                text: "VIP"
            },
            popup_shop_Standard: {
                text: "Standard"
            },
            popup_shop_Mobile: {
                text: "Mobile"
            },
            popup_warning_switch_to_app_fb: {
                text: "Sila beralih ke aplikasi facebook untuk \n membeli!"
            },
            popup_warning_switch_to_app_fb_to_invite: {
                text: "Sila beralih ke aplikasi facebook untuk \n menjemput!"
            },
            popup_warning_switch_to_app_fb_to_send_gift: {
                text: "Silahkan brealih ke aplikasi facebook untuk \n menghantar hadiah!"
            },
            popup_warning_switch_to_app_fb_to_share: {
                text: "Sila beralih ke aplikasi facebook untuk \n berkongsi!"
            },
            menu_setting_Label: {
                text: "SETTINGS"
            },
            menu_setting_GraphicQuality: {
                text: "Kualitas Grafik"
            },
            menu_setting_Music: {
                text: "Musik"
            },
            menu_setting_Sound: {
                text: "Suara"
            },
            menu_setting_Language: {
                text: "Bahasa"
            },
            popup_voucher_description: {
                text1: "Anda telah dianugrahkan ",
                text2: " koins"
            },
            share_facebook_levelup: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "Level Up",
                caption: "Level New Dicapai dalam PlayPalace!",
                info: "telah berjaya menyamakan kedudukan sehingga Level"
            },
            share_facebook_game_unlock: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/game_unlock.png",
                name: "Permainan Unlock",
                caption: "Permainan baru Unlocked dalam PlayPalace!",
                info: "mempunyai permainan baru berjaya unlocked di Palace Main!"
            },
            popup_user_level_up:{
                text1 : "Level ",
                text2 : " dicapai",
                text3 : "Berikut ",
                text4 : " Coins Percuma Untuk Anda"
            },
            popup_user_game_unlock:{
                text1 : "Level ",
                text2 : " dicapai",
                text3 : " kini dibuka & ada",
                text4 : "Membuka kunci",
                text5 : "Crown",

                text6: "Membuka Oleh Crown",
                text7: "Membuka permainan ini dengan ",
                text8: " crown?",
                text9:" Kali Tahap Booster",
                text10:" Spin Bertuah"
            },
            main_menu_not_support_region: {
                text: "Rantau anda tidak disokong"
            },
            body_slot_game_coming_soon: {
                text: "Akan datang"
            },
            popup_inbox_button_accept_all: {
                text: "Menerima semua"
            },
            ok: {
                text: "Okey"
            },
            loginFacebook: {
                text: "Log masuk Facebook"
            },
            collect: {
                text: "Mengumpul"
            },
            collectAndShare: {
                text: "Mengumpul & Share"
            },
            cancel: {
                text: "Batal"
            },
            buyNow: {
                text: "Beli sekarang"
            },
            goToLobby: {
                text: "Pergi untuk melobi"
            },
            send: {
                text: "Menghantar"
            },
            voucher_has_expired: {
                text: "Voucher telah tamat"
            },
            voucher_has_already_been_redeemed: {
                text: "Voucher telah pun ditebus"
            },
            you_have_unlocked_a_new_game: {
                text: "Anda telah membuka permainan baru"
            },
            crown_purchase_successfully: {
                text: "Crown berjaya membeli. Sila tunggu server permainan kami untuk memproses pembayaran ini"
            },
            coin_purchase_successfully: {
                text: "Syiling membeli dengan jayanya. Sila tunggu server permainan kami untuk memproses pembayaran ini"
            },
            new_game_tile: {
                text: "Kandungan baru akan datang"
            },
            new_game_description: {
                text: "Kami sedang berusaha keras untuk membawa anda kandungan baru"
            },
            cant_get_image:{
                text: "Anda tidak boleh mendapat imej ini!"
            },
            download_remove:{
                message_download: " akan mula memuat turun sebentar lagi. Sementara itu anda boleh bermain permainan yang lain. Sambungan Wi-Fi adalah disyorkan untuk memuat turun slot, caj 3G / LTE boleh dikenakan.",
                info_remove: "Buang permainan bila-bila masa dengan menekan dan menahan ke bawah",
                download: "DOWNLOAD",
                remove: "MEMBUANG",
                stop: "BERHENTI",
                continue: "TERUS",
                wait_to_download: "Sila tunggu sementara permainan data dimuat turun. ",
                download_soon: " akan dimuat turun tidak lama lagi!",
                downloading: "Memuat turun sumber untuk ",
                cancle_download: ". Adakah anda mahu membatalkan muat turun ini?",
                update: "UPDATE",
                message_update: "Sumber yang permainan ini perlu dikemas kini. Adakah anda mahu untuk mengemaskini sekarang?",
                message_remove: "Permainan akan bermula memotong sebentar lagi.",
                delete_failed: "Padam permainan gagal."
            },
            exit_game:{
                title: "Keluar mengesahkan",
                message: "Adakah anda mahu berhenti bermain?"
            },
            not_enough_space:{
                text: "Peranti anda tidak mempunyai ruang simpanan yang mencukupi."
            },
            login_some_where:{
                text: "Akaun anda telah log masuk daripada peranti lain.\nKlik OK untuk menambah nilai."
            },
            cant_get_data_FB:{
                text: "Tidak boleh mendapatkan data dari facebook.\nSila cuba sebentar lagi."
            },
            FB_token_expired:{
                text: "Token Facebook anda telah expired.\nSila muat semula app."
            },
            purchased:{
                approved: "Pembelian diluluskan!",
                reward: "Ganjaran anda ialah: ",
                payment_accepted: "Bayaran anda diterima!",
                support: "Jika anda tidak menerima syiling, sila hubungi admin untuk sokongan!",
                not_available: "Produk tidak boleh didapati sekarang!"
            },
            free_coin:{
                received: "Menerima",
                play_fail: "Anda tidak boleh memainkan video pada masa ini. Sila cuba sebentar lagi.",
                title: "Duit syiling percuma"
            }
        },
        indo: {
            popup_need_level_to_play_game:{
                text1: "Anda perlu Mencapai tingkat ",
                text2:" untuk memainkan game ini."
            },
            setting_language_lable: {
                text: "B-Indonesia"
            },
            setting_logged_with_lable: {
                text: "Login melalui: "
            },
            setting_logout_lable: {
                text: "Keluar"
            },
            setting_login_lable: {
                text: "Masuk"
            },
            setting_game_option_lable: {
                text: "Pilihan permainan"
            },
            setting_back_ground_music_lable: {
                text: "Latarbelakang musik"
            },
            setting_back_sound_effect_lable: {
                text: "Efek suara"
            },
            setting_language: {
                text: "Bahasa"
            },
            setting_push_notifi_lable: {
                text: "Push Pemberitahuan"
            },
            setting_friend_request_lable: {
                text: "Permintaan pertemanan"
            },
            setting_btn_tearm_lable: {
                text: "Jangka Layanan"
            },
            setting_btn_privacy_lable: {
                text: "Kebijakan pribadi"
            },
            setting_version_lable: {
                text: "Versi"
            },
            footer_collect_lable: {
                text: "Mengumpulkan"
            },
            footer_collect_time_bonus_in_lable: {
                text: "Bonus waktu di"
            },
            footer_achievement_lable: {
                text: "Prestasi"
            },
            popup_profile_to_level_up_lable: {
                text: " XP\nuntuk tingkat atas"
            },
            footer_gift_lable: {
                text: "Hadiah"
            },
            header_profile_tooltip: {
                text: "Profil"
            },
            header_invite_tooltip: {
                text: "Undang Teman"
            },
            header_sendgift_tooltip: {
                text: "Pengiriman Hadiah"
            },
            header_shop_tooltip: {
                text: "Shop"
            },
            header_stardom_tooltip: {
                text: "Stardom"
            },
            header_Level: {
                text: "Level"
            },
            header_recent_winner_text: {
                text1: "Baru saja",
                text2: "Pemenang"
            },
            popup_shop_transaction_cancelled: {
                text: "Transaksi Dibatalkan"
            },
            popup_achievement_title: {
                text: "PENCAPAIAN"
            },
            popup_achievement_total_achievement_point: {
                text: "POIN PRESTASI"
            },
            popup_achievement_group_title_general: {
                text: "Umum"
            },
            popup_achievement_group_title_game: {
                text: "Permainan"
            },
            popup_achievement_group_title_social: {
                text: "Sosial"
            },
            popup_profile_logo: {
                text: "Profil"
            },
            popup_profile_level: {
                text: "Level"
            },
            popup_profile_rank: {
                text: "Ranking"
            },
            popup_profile_MaximumCoins: {
                text: "Maksimum koins"
            },
            popup_profile_PlayedSince: {
                text: "Bermain sejak"
            },
            popup_profile_btn_SendFreeGift: {
                text: "Mengirimkan Hadiah gratis"
            },
            popup_profile_btn_SendCoins: {
                text: "Mengirimkan Koin"
            },
            popup_profile_Slot_NumberofJackpot: {
                text: "Jumlah Jackpot"
            },
            popup_profile_Slot_Win: {
                text: "Menang: "
            },
            popup_profile_Slot_BiggestWin: {
                text: "Kemenangan Terbesar"
            },
            popup_profile_Slot_TotalSpin: {
                text: "Jumlah total Spin"
            },
            popup_profile_Slot_NetProfit: {
                text: "Keuntungan Bersih"
            },
            popup_profile_Blackjack_NumberofBlackjack: {
                text: "Jumlah Blackjack"
            },
            popup_profile_Blackjack_PlayedHand: {
                text: "Tangan Pemain"
            },
            popup_profile_Blackjack_BiggestWin: {
                text: "Pemenang Terbesar"
            },
            popup_profile_Blackjack_Win: {
                text: "Kemenangan"
            },
            popup_profile_Blackjack_NetProfit: {
                text: "Keuntungan Bersih"
            },
            popup_profile_Change_Avatar: {
                title: "Ganti Avatar",
                success: "Ganti Avatar Sukses!",
                fail: "Ganti Avatar Gagal!"
            },
            popup_profile_Blackjack_MaxWinInaRow: {
                text: "Maksimum kemenangan berturut turut"
            },
            popup_gift_leaderboard: {
                text: "Papan"
            },
            popup_gift_friends: {
                text: "Teman"
            },
            popup_gift_inbox: {
                text: "Inbox"
            },
            popup_gift_inbox_empty: {
                text: "Kotak masuk kosong!"
            },
            popup_gift_error_oop: {
                text: "Peringatan"
            },
            popup_gift_error_message: {
                text: "Silahkan login dengan akun facebook Anda!"
            },
            popup_gift_select: {
                text: "Silakan pilih minimal satu teman!"
            },
            popup_gift_success: {
                text: "Keberhasilan"
            },
            popup_gift_send_free_gift_success: {
                text: "Kirim keberhasilan hadiah gratis!"
            },
            popup_gift_invite_success: {
                text : "Undang sukses!"
            },
            popup_gift_info: {
                text:  " Dapat 100.000 koin"
            },
            popup_gift_warning: {
                text: "Peringatan"
            },
            popup_gift_warning_message: {
                text: " Silakan coba lagi nanti"
            },
            popup_gift_accept_success: {
                text: "Terima berhasil!"
            },
            popup_gift_anonymous:{
                text: "Anonim"
            },
            popup_edit_name: {
                title: "Ganti Nama",
                fail:"Ketik nama",
                success:"Keberhasilan perubahan nama",
                reachLimit:"perubahan nama maksimum mencapai"
            },
            popup_change_language: {
                fail:"Gagal!",
                success:"Keberhasilan!"
            },
            popup_invite_description: {
                text: "Jika anda mengundang kawan anda untuk bergabung, anda akan mendapatkan  $ 700 untuk setiap kawan anda"
            },
            popup_invite_tab_FriendtoSendGift: {
                text: "Teman untuk mengirimkan hadiah"
            },
            popup_invite_tab_AllFriends: {
                text: "Semua Teman"
            },
            popup_invite_FriendsSelected: {
                text: "Teman terpilih"
            },
            popup_invite_btn_UnSelectAll: {
                text: "Jangan pilih semuanya"
            },
            popup_invite_btn_SelectAll: {
                text: "Pilih semuanya"
            },
            popup_invite_btn_SendGift: {
                text: "Mengirim hadiah"
            },
            popup_invite_btn_Invite: {
                text: "Mengundang"
            },
            popup_invite_error_non_select: {
                text: "Silakan pilih minimal satu teman!"
            },
            popup_invite_tab_GameFriend: {
                text: "Game Friends"
            },
            popup_askfriend_description: {
                text: "Anda dapat menerima maksimal 3  kunci per hari"
            },
            popup_askfriend_btn_label: {
                text: "Tanya teman"
            },
            popup_SendGift_Description: {
                text: "Jika anda mengirimkan hadiah kepada kawan anda , anda akan mendapatkan $ 700"
            },
            popup_shop_btn_BuyNow: {
                text: "Beli Sekarang"
            },
            popup_stardom_level: {
                text: "Level"
            },
            popup_stardom_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_BiggestWin: {
                text: "Pemenang Terbesar"
            },
            popup_stardom_JackPot: {
                text: "Jackpot"
            },
            popup_stardom_label_Player: {
                text: "Pemain"
            },
            popup_stardom_player_AllPlayers: {
                text: "Semua Pemain"
            },
            popup_stardom_player_Friends: {
                text: "Teman teman"
            },
            popup_stardom_player_BankRoll: {
                text: "Bankroll"
            },
            popup_stardom_player_NetProfit: {
                text: "Keuntungan Bersih"
            },
            popup_stardom_player_BiggestWin: {
                text: "Pemenang Terbesar"
            },
            popup_stardom_player_Jackpot: {
                text: "Jackpot"
            },
            popup_stardom_player_Ranking: {
                text: "Ranking"
            },
            popup_stardom_player_Players: {
                text: "Para Pemain"
            },
            popup_stardom_player_Coins: {
                text: "Koins"
            },
            popup_stardom_player_PlayTogether: {
                text: "Bermain bersama"
            },
            popup_stardom_player_Game: {
                text: "Permainan"
            },
            popup_secretgift_description: {
                text1: "*Peringatan!",
                text2: "Kunci yang dibeli dari Toko kunci tidak akan kadaluwarsa"
            },
            popup_smallbox_description: {
                text: "3 Kunci diperlukan untuk membuka  Kotak"
            },
            popup_inbox_btn_Accept: {
                text: "Menerima "
            },
            popup_inbox_btn_Accept_SendGift: {
                text: "Menerima dan Mengirimkan hadiah"
            },
            popup_inbox_btn_SendKey: {
                text: "Mengirimkan Kunci"
            },
            popup_inbox_btn_Accept_SendGift_All: {
                text: "Menerima dan Mengirimkan hadiah"
            },
            popup_inbox_Message_Gift: {
                text1: "Saya kirimkan ",
                text2: " Koin untuk anda, Semoga anda beruntung!"
            },
            popup_inbox_Message_FreeGift: {
                text1: "Saya kirimkan hadiah hingga ",
                text2: " Koin untuk anda, Semoga anda beruntung!"
            },
            popup_inbox_Message_SystemGift: {
                text1: "Saya kirimkan hadiah hingga ",
                text2: " Koin untuk anda, Semoga anda beruntung!"
            },
            popup_inbox_Message_Requestkey: {
                text: "Mohon kirimkan 1 kunci!"
            },
            popup_inbox_Message_Promote: {
                text1: "Bonus promosi untuk mengundang teman (",
                text2: ") koins"
            },
            popup_inbox_Message_Vip: {
                text: "Bonus promosi untuk menjadi VIP"
            },
            popup_inbox_Friend_Benefit: {
                text: "Anda telah menerima 50.000 koin untuk mengundang pengguna"
            },
            popup_inbox_Reference_Code: {
                text: "Hadiah dari kode referensi"
            },
            popup_inbox_Top_Player_Gift: {
                text: "Hadiah untuk Top Pemain"
            },
            popup_inbox_Message_Vip_Up: {
                text: "Selamat untuk Vip Up!"
            },
            popup_shop_Vip: {
                text: "VIP"
            },
            popup_shop_Standard: {
                text: "Standard"
            },
            popup_shop_Mobile: {
                text: "Mobile"
            },
            menu_setting_Label: {
                text: "Pengaturan"
            },
            menu_setting_GraphicQuality: {
                text: "Kualitas Grafik"
            },
            menu_setting_Music: {
                text: "Musik"
            },
            menu_setting_Sound: {
                text: "Suara"
            },
            menu_setting_Language: {
                text: "Bahasa"
            },
            popup_voucher_description: {
                text1: "Anda telah dianugrahkan ",
                text2: " koin"
            },
            popup_warning_switch_to_app_fb: {
                text: "Silahkan brealih ke aplikasi facebook untuk \n membeli!"
            },
            popup_warning_switch_to_app_fb_to_invite: {
                text: "Silahkan brealih ke aplikasi facebook untuk \n mengundang!"
            },
            popup_warning_switch_to_app_fb_to_send_gift: {
                text: "Silahkan brealih ke aplikasi facebook untuk \n mengirim hadiah!"
            },
            popup_warning_switch_to_app_fb_to_share: {
                text: "Silahkan beralih ke aplikasi facebook untuk \n berbagi!"
            },
            share_facebook_levelup: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "Naik tingkat",
                caption: "Tingkat baru Dicapai dalam PlayPalace!",
                info: "telah berhasil diratakan ke Level"
            },
            share_facebook_game_unlock: {
                link_fb: LobbyConfig.facebookAppDomain,
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/game_unlock.png",
                name: "Game Aktifkan",
                caption: "Game baru unlocked di PlayPalace!",
                info: "memiliki permainan baru berhasil dibuka di Play Palace!"
            },
            popup_user_level_up:{
                text1 : "Tingkat ",
                text2 : " dicapai",
                text3 : "Berikut ",
                text4 : " Gratis Koin Untuk Anda"
            },
            popup_user_game_unlock:{
                text1 : "Level ",
                text2 : " Tingkat",
                text3 : " is now unlocked & available",
                text4 : "Membuka kunci",
                text5 : "Crown",

                text6: "Membuka Dengan Crown",
                text7: "Membuka permainan ini dengan ",
                text8: " crowns?",
                text9:" Kali Tingkat Penguat",
                text10:" Berputar Beruntung"
            },
            main_menu_not_support_region: {
                text: "Wilayah Anda saat ini tidak didukung"
            },
            body_slot_game_coming_soon: {
                text: "Segera akan datang"
            },
            popup_inbox_button_accept_all: {
                text: "Terima semua"
            },
            ok: {
                text: "Baik"
            },
            loginFacebook: {
                text: "Masuk Facebook"
            },
            collect: {
                text: "Mengumpulkan"
            },
            collectAndShare: {
                text: "Kumpulkan & Share"
            },
            cancel: {
                text: "Batalkan"
            },
            buyNow: {
                text: "Beli sekarang"
            },
            goToLobby: {
                text: "Pergi ke lobi"
            },
            send: {
                text: "Kirim"
            },
            voucher_has_expired: {
                text: "Voucher telah berakhir"
            },
            voucher_has_already_been_redeemed: {
                text: "Voucher telah ditukarkan"
            },
            you_have_unlocked_a_new_game: {
                text: "Anda telah membuka sebuah game baru"
            },
            crown_purchase_successfully: {
                text: "Crown membeli berhasil. Silahkan tunggu server game kami untuk memproses pembayaran ini"
            },
            coin_purchase_successfully: {
                text: "Koin membeli berhasil. Silahkan tunggu server game kami untuk memproses pembayaran ini"
            },
            new_game_tile: {
                text: "Konten baru segera hadir"
            },
            new_game_description: {
                text: "Kami bekerja keras untuk membawa Anda konten baru"
            },
            cant_get_image:{
                text: "Anda tidak bisa mendapatkan gambar ini!"
            },
            download_remove:{
                message_download: " akan mulai men-download. Sementara itu Anda dapat bermain game lain yang tersedia. Koneksi Wi-Fi dianjurkan untuk men-download slot, biaya 3G / LTE mungkin berlaku.",
                info_remove: "Hapus permainan kapan saja dengan menekan ke bawah",
                download: "DOWNLOAD",
                remove: "MENGHAPUS",
                stop: "BERHENTI",
                continue: "TERUS",
                wait_to_download: "Harap tunggu sementara data game download. ",
                download_soon: " akan diunduh segera!",
                downloading: "Download sumber daya untuk ",
                cancle_download: ". Apakah Anda ingin membatalkan unduhan ini?",
                update: "MEMPERBARUI",
                message_update: "Sumber daya dari game ini perlu diperbarui. Apakah Anda ingin memperbarui sekarang?",
                message_remove: "Game akan mulai segera menghapus.",
                delete_failed: "Hapus permainan gagal."
            },
            exit_game:{
                title: "Keluar konfirmasi",
                message: "Apakah Anda ingin berhenti bermain?"
            },
            not_enough_space:{
                text: "Perangkat Anda tidak memiliki ruang penyimpanan yang cukup."
            },
            login_some_where:{
                text: "Akun Anda telah login dari perangkat lain.\nKlik OK untuk reload."
            },
            cant_get_data_FB:{
                text: "Tidak bisa mendapatkan data dari facebook.\nSilakan coba lagi nanti."
            },
            FB_token_expired:{
                text: "Token facebook Anda telah expired.\nMuat ulang aplikasi."
            },
            purchased:{
                approved: "Pembelian disetujui!",
                reward: "Upahmu: ",
                payment_accepted: "Pembayaran diterima!",
                support: "Jika Anda tidak menerima koin, silahkan hubungi admin untuk dukungan!",
                not_available: "Produk tidak tersedia sekarang!"
            },
            free_coin:{
                received: "Menerima",
                play_fail: "Anda tidak dapat memutar video pada saat ini. Silakan coba lagi nanti.",
                title: "Koin gratis"
            }
        }
    };
    return my;
}(LobbyC.MainMenu || {}));
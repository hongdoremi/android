LobbyC.MainMenu = (function (my) {
        my._currentAchievementListOfUser = null;
        my._achievementGroupArray = [];
        my._currentChoosenGroup = 0;
        my._currentCollectAchievementY = 0;
        my._currentScrollButtonY = 0;
        my._originalYOfRightPanel = 115;
        my._maskRightPanelSize = {
            width: 1050,
            height: 720
        };

        my._recentWinnerGroup = null;


        var isClicked = false;
        /**
         * Add 3 stars UI or Link to Facebook Icon for achievement cell
         * @param achievementGroup: Achivement group that this belongs (General, Game, Social)
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         * @param categoryId: Category ID of this Achivement
         * @param beanUserAchievement: this achivement cell's info
         * @param userAchievementGroup: Group parent of this Cell UI
         * @param leftGroup: group in left of this Cell UI
         * @param isAddStar: boolen - check if it should add star or link to FB icon
         * @param numberOfStar: number of star should added
         */
        my.add3StarOrAvatarLinkToFacebookAchievement = function (achievementGroup,
                                                                 leftPanel,
                                                                 rightPanel,
                                                                 categoryId,
                                                                 beanUserAchievement,
                                                                 userAchievementGroup,
                                                                 leftGroup,
                                                                 isAddStar,
                                                                 numberOfStar) {
            if (!isAddStar) {
                var avatarLinkToFacebookAchievement = my.add.sprite(
                    55,
                    0,
                    "popup_achievement_facebook_avatar",
                    null,
                    leftGroup);
                avatarLinkToFacebookAchievement.scale.setTo(0.7, 0.7);
                return;
            }

            // add 3 ngoi sao
            for (var index = 0; index < 3; ++index) {
                var spriteName = "";
                if (index < numberOfStar) {
                    spriteName = "popup_achievement_star_with_color";
                } else {
                    spriteName = "popup_achievement_star_without_color";
                }
                var starAsSprite = my.add.sprite(
                    0,
                    10,
                    spriteName,
                    null,
                    leftGroup);
                // neu la ngoi sao o giua thi scale lon hon 2 ngoi sao ben canh
                if (index == 1) {
                    starAsSprite.position = {
                        x: starAsSprite.width * index + 5,
                        y: -5
                    };
                    starAsSprite.scale.setTo(1.3, 1.3);
                }
                if (index == 2) {
                    starAsSprite.position = {
                        x: starAsSprite.width * index + 25,
                        y: 10
                    };
                }
            }
        };
        /**
         * Create and add an User's Achievement Cell UI in right panel
         * @param achievementGroup: Achivement group that this belongs (General, Game, Social)
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         * @param categoryId: Category ID of this Achivement
         * @param beanUserAchievement: this achivement cell's info
         * @param userAchievementGroup: Group parent of this Cell UI
         */
        my.addUserAchievementCellToCategoryCellInRightPanel = function (achievementGroup,
                                                                        leftPanel,
                                                                        rightPanel,
                                                                        categoryId,
                                                                        beanUserAchievement,
                                                                        userAchievementGroup) {
            // left group chua 3 star hoac avatar link to facebook achievement
            var leftGroup = my.add.group(userAchievementGroup);

            var numberOfStar = 0;
            if (beanUserAchievement.is_collected) {
                numberOfStar = 3;
            } else {
                // nếu là dạng nhiệm vụ chỉ có 1 bậc, mà chưa hoàn thành thì không hiển thị sao nào, ngược lai thì trừ bớt 1 sao
                if (beanUserAchievement.is_only_one_achievement) {
                    numberOfStar = 0;
                } else {
                    numberOfStar = beanUserAchievement.star - 1;
                }
            }

            var isAddStar = (beanUserAchievement.achievement_id != 45);
            my.add3StarOrAvatarLinkToFacebookAchievement(achievementGroup,
                leftPanel,
                rightPanel,
                categoryId,
                beanUserAchievement,
                userAchievementGroup,
                leftGroup,
                isAddStar, // 45 la id cua achievement Linked Account to Facebook
                numberOfStar
            );
            leftGroup.position = {
                x: 0,
                y: 30
            };

            // right group chua ten, tien thuong, trang thai hoan thanh, nut collect, ...
            var rightGroup = my.add.group(userAchievementGroup);

            /* ---------------- Achievement Name & Coin Reward ---------------- */
            var achievementName = my.add.text(
                10,
                10,
                (isAddStar)
                    ? beanUserAchievement.sub_category_name + " - " + beanUserAchievement.name
                    : beanUserAchievement.sub_category_name,
                {
                    font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#eacaf2",
                    align: "center"
                },
                rightGroup
            );
            var coinSprite = my.add.sprite(
                achievementName.x,
                achievementName.height + 10,
                "popup_achievement_icon_coin_reward",
                null,
                rightGroup);
            var coinRewardText = my.add.text(
                coinSprite.x + coinSprite.width + 10,
                coinSprite.y,
                Lobby.Utils.formatNumberWithCommas(beanUserAchievement.coin_reward),
                {
                    font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#ffffbf",
                    align: "center"
                },
                rightGroup
            );
            // achievementType == 5: Achiever achievement type -> hiển thị crown reward, đổi sprite
            if (beanUserAchievement.achievement_type == 5) {
                coinSprite.loadTexture("popup_achievement_icon_crown_reward");
                coinSprite.scale.setTo(0.6, 0.6);
                coinSprite.x -= 15;
                coinRewardText.text = Lobby.Utils.formatNumberWithCommas(beanUserAchievement.crown_reward);
                coinRewardText.x += 5;
            }

            /* ---------------- Achievement Progress Slider ---------------- */
            var achievementProgressBackground = my.add.sprite(
                10,
                coinSprite.y + coinSprite.height + 5,
                "popup_achievement_bg_slide_collect",
                null,
                rightGroup);

            var sliderGroup = my.add.group(rightGroup);
            // load slider o dang original
            var achievementProgressSlide = my.add.sprite(
                achievementProgressBackground.x,
                coinSprite.y + coinSprite.height + 5,
                "popup_achievement_slider",
                null,
                sliderGroup);

            // tim ty le can scale
            var ratio = beanUserAchievement.current_status / beanUserAchievement.achievement_goal;
            ratio = (ratio > 1) ? 1 : ratio;

            // 2016-05-10: Phuoc: nếu ratio khác 0 nhưng quá nhỏ thì sẽ tăng lên, đủ nhìn thấy là có progress
            ratio = (ratio != 0 && ratio < 0.01) ? 0.01 : ratio;

            var maskSlider = my.add.graphics(achievementProgressSlide.x, achievementProgressSlide.y);
            maskSlider.beginFill();
            maskSlider.beginFill(0xffffff);
            maskSlider.drawRect(
                0,
                0,
                achievementProgressSlide.width * ratio,
                achievementProgressSlide.height);
            maskSlider.endFill();
            sliderGroup.add(maskSlider);

            // Duy, fix error undefine "data"
            var sprite = my.add.sprite(0, 0);
            sprite.addChild(maskSlider);
            sprite.visible = true;
            sliderGroup.add(sprite);
            sliderGroup.mask = maskSlider;

            var achievementProgressText = my.add.text(
                0,
                achievementProgressBackground.y + 1,
                beanUserAchievement.current_status + "/" + beanUserAchievement.achievement_goal,
                {
                    font: "28px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#ffffff",
                    align: "center"
                },
                rightGroup
            );
            Lobby.PhaserJS.centerXParent(achievementProgressText, achievementProgressBackground);
            /* ---------------- Achievement Progress Slider ---------------- */

            // neu collect roi thi hien "Achievement Completed!"
            if (beanUserAchievement.is_collected) {
                var achievementCompletedText = my.add.text(
                    0,
                    coinSprite.y,
                    // later: multi language
                    "Achievement Completed!",
                    {
                        font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                        fill: "#ffffff",
                        align: "center"
                    },
                    rightGroup
                );
                achievementCompletedText.x = achievementProgressBackground.width - achievementCompletedText.width - 10;
            } else {
                // truong hop chua collect, nhung da hoan thanh: hien nut collect
                if (beanUserAchievement.is_complete) {
                    var btnCollectGroup = my.add.group(rightGroup);
                    var btnCollectBackground = Lobby.PhaserJS.createSpriteRectangleExt(
                        my,
                        0,
                        achievementName.y + 5,
                        function () {
                            if(isClicked){
                                return;
                            }
                            isClicked = true;
                            my.resizeButtonAndTextAnimationScaleDown(btnCollectBackground, btnCollectText);
                            my.time.events.add(150,
                                function () {

                                    var positionPlayAnimation = {
                                        x: my.input.activePointer.x,
                                        y: my.input.activePointer.y
                                    };
                                    //DUY - DISABLE MOUSEWHEEL WHEN REQUEST COLLECT
                                    my.input.mouse.mouseWheelCallback = null;

                                    var callbackCollectAchievement = function (data) {
                                        if(LobbyConfig.isDebug) console.log("Collect achievement ..................", data);
                                        if (data == null) {
                                            isClicked = false;
                                            return;
                                        }
                                        LobbyRequest.User.getAchievementList(function (data) {
                                            //console.log("data return from LobbyRequest.User.getAchievementList: ", data);
                                            my._currentAchievementListOfUser = data.member;
                                            // set lai tong so achievement point
                                            //my._achievementPointsNumber.text
                                            //    = parseInt(my._achievementPointsNumber.text) + beanUserAchievement.achievement_point_reward;
                                            // load lai profile de lan sau mo pop up achievement se hien thi dung so achievement point

                                            //my._currentScrollButtonY = my.scrollButton.y;
                                            my._currentCollectAchievementY = achievementName.y + 10;
                                            my.updateUserInfoFromSVWithCoinAnim(
                                                function (isSuccess) {
                                                    if (isSuccess) {
                                                        my._achievementPointsNumber.text = my._userData.profile.achievement_point;
                                                    }
                                                },
                                                positionPlayAnimation
                                            );

                                            //my.time.events.add(1000,
                                            //    function() {
                                                    //DUY - ENABLE MOUSEWHEEL AFTER REQUEST COLLECT
                                                    my.input.mouse.mouseWheelCallback = my.mouseWheel;
                                                    my.updateAllAchievementNotification();
                                                    my.addAllAchievementGroupInLeftPanel(leftPanel, rightPanel, true);
                                                    my.time.events.add(500,
                                                        function() {
                                                            isClicked = false;
                                                        });

                                                //},this);
                                        }, my, true);

                                        // truong hop achievement ke tiep cung loai
                                        //if (data.sub_category_id == beanUserAchievement.sub_category_id) {
                                        //
                                        //} else {
                                        //    //
                                        //}
                                    };
                                    LobbyRequest.User.collectAchievement(
                                        beanUserAchievement.achievement_id,
                                        callbackCollectAchievement,
                                        my
                                    );
                                }, this);

                        },
                        function () {
                            my.resizeButtonAndTextAnimationScaleUp(btnCollectBackground, btnCollectText);
                        },
                        function () {
                            my.resizeButtonAndTextAnimationScaleUp(btnCollectBackground, btnCollectText);
                        },
                        btnCollectGroup,
                        LobbyConfig.isDebug,
                        "popup_achievement_btn_collect"
                    );

                    btnCollectBackground.x = achievementProgressBackground.width - btnCollectBackground.width - 10;
                    var btnCollectText = my.add.text(
                        0,
                        5,
                        // later: multi language
                        "Collect",
                        {
                            font: "32px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                            fill: "#ffffff",
                            align: "center"
                        },
                        btnCollectGroup
                    );
                    Lobby.PhaserJS.centerItemInBackground(
                        btnCollectText,
                        btnCollectBackground
                    );
                }
                else {
                    // truong hop chua hoan thanh: hien so achievement point se duoc thuong
                    var achievementPointRewardBackground = my.add.sprite(
                        0,
                        achievementName.y + 5,
                        "popup_achievement_bg_point",
                        null,
                        rightGroup);
                    achievementPointRewardBackground.x = achievementProgressBackground.width - achievementPointRewardBackground.width - 10;
                    var achievementPointRewardBackgroundText = my.add.text(
                        0,
                        0,
                        beanUserAchievement.achievement_point_reward.toString(),
                        {
                            font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                            fill: "#ffffff",
                            align: "center"
                        },
                        rightGroup
                    );
                    Lobby.PhaserJS.centerItemInBackground(
                        achievementPointRewardBackgroundText,
                        achievementPointRewardBackground
                    );
                }
            }
            rightGroup.position = {
                x: leftGroup.width + 20,
                y: 0
            };

            // neu la achievement link facebook thi keo rightGroup ve ben phai
            if (!isAddStar) {
                rightGroup.x += 105
            }

        };
        /**
         * Create and add a Category Cell UI in Right panel
         * @param achievementGroup: Achivement group that this belongs (General, Game, Social)
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         * @param categoryId: Category ID
         * @param categoryName: Category name
         * @returns {*} a Category Cell UI
         */
        my.addCategoryCellInRightPanel = function (achievementGroup,
                                                   leftPanel,
                                                   rightPanel,
                                                   categoryId,
                                                   categoryName) {

            var categoryGroup = my.add.group(rightPanel);

            /* ------------------------------------------ them tieu de cho cate ------------------------------------------*/
            var categoryTitleGroup = my.add.group(categoryGroup);
            var categoryTitleBackground = Lobby.PhaserJS.createSpriteRectangle(
                my,
                0,
                0,
                function () {
                },
                function () {
                },
                function () {
                },
                false, //useHandCursor
                categoryTitleGroup,
                LobbyConfig.isDebug,
                "popup_achievement_bg_category");

            var categoryTitleText = my.add.text(
                30,
                0,
                categoryName,
                {
                    font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#eb76e4",
                    align: "center"
                },
                categoryTitleGroup
            );
            Lobby.PhaserJS.centerYItemInBackground(
                categoryTitleText,
                categoryTitleBackground
            );
            /* ------------------------------------------ them tieu de cho cate ------------------------------------------*/

            var countUserAchievement = 0;
            for (var index = 0; index < my._currentAchievementListOfUser.length; ++index) {
                var userAchievement = my._currentAchievementListOfUser[index];
                //if (userAchievement.category_id != categoryId
                //    || userAchievement.achievement_type == 0) {
                //    continue;
                //}
                if (userAchievement.category_id != categoryId) {
                    continue;
                }
                // tao group chua cac cell userAchievement
                var userAchievementGroup = my.add.group(categoryGroup);
                my.addUserAchievementCellToCategoryCellInRightPanel(
                    achievementGroup,
                    leftPanel,
                    rightPanel,
                    categoryId,
                    userAchievement,
                    userAchievementGroup
                );
                userAchievementGroup.position = {
                    x: 0,
                    y: userAchievementGroup.height * countUserAchievement + 50
                };
                ++countUserAchievement;
            }

            return categoryGroup;
        };
        /**
         * Add list Category Cell to Right Panel
         * @param achievementGroup: Achivement group that this belongs (General, Game, Social)
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         */
        my.addAchievementListInRightPanel = function (achievementGroup,
                                                      leftPanel,
                                                      rightPanel) {
            try {
                rightPanel.removeAll(
                    true, //destroy
                    true //silent
                );
            } catch (ex) {
                if(LobbyConfig.isDebug) console.log(ex);
            }
            // tim danh sach cac category
            var categoryMap = new Map();
            for (var index = 0; index < my._currentAchievementListOfUser.length; ++index) {
                var userAchievement = my._currentAchievementListOfUser[index];
                if (userAchievement.group_type == achievementGroup.groupIndex
                    && !categoryMap.contains(userAchievement.category_id)) {
                    categoryMap.put(userAchievement.category_id, userAchievement.category_name);
                }
            }

            //var count = 0;
            var height = 0;
            //height = my._currentCollectAchievementY;
            categoryMap.each(function (key, value, what) {
                //console.log("categoryMap.each:", key, value, what);
                var categoryGroup = my.addCategoryCellInRightPanel(
                    achievementGroup,
                    leftPanel,
                    rightPanel,
                    key,
                    value
                );
                //categoryGroup.position = {
                //    x: categoryGroup.x,
                //    y: categoryGroup.height * count + 20
                //};
                //console.log(categoryGroup.height, count, height);

                categoryGroup.y = height;
                height += categoryGroup.height + 30;
                //++count;
                //if (count > 1) {
                //    return;
                //}
                //console.log("aaaaaaaaaaaaaaaaaaaaa", rightPanel.height);
            });

            //my.addCategoryCellInRightPanel(
            //    achievementGroup,
            //    leftPanel,
            //    rightPanel,
            //    0,
            //    "Personal Progression"
            //);
        };
        /**
         * Function call when switch achievement group in left panel
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         * @param groupIndex: Index of Achievement Group
         * @param isCollected: deprecated
         */
        my.switchAchievementGroupInLeftPanel = function (leftPanel,
                                                         rightPanel,
                                                         groupIndex,
                                                         isCollected) {
            my._currentChoosenGroup = groupIndex;
            for (var index = 0; index < leftPanel.children.length; ++index) {
                var achievementGroup = leftPanel.children[index];
                // nếu là group muốn chọn thì active background, không thì inactive background
                if (achievementGroup.groupIndex == groupIndex) {
                    achievementGroup.background.loadTexture("popup-achievement-bg-group-active");
                    my.addAchievementListInRightPanel(
                        achievementGroup,
                        leftPanel,
                        rightPanel
                    );
                    //console.log("bbbbbbbbbbbb", rightPanel.height);
                } else {
                    achievementGroup.background.loadTexture("popup-achievement-bg-group-inactive");
                }
            }

            /* ---------------- mask cho rightPanel ---------------- */
            var rightPanelWithMaskGroup = rightPanel.parent;

            var tableHeight = 680;
            rightPanel.y = 0;
            if (rightPanel.height > tableHeight) {
                my.game.kineticScrolling.start(rightPanel,
                    false,
                    true,
                    0,
                    0,
                    rightPanel.height - tableHeight,
                    0,
                    my,
                    null,
                    null,
                    null,
                    null,
                    null,
                    {
                        minX: 475,
                        minY: 108,
                        maxX: 1388,
                        maxY: 836
                    });
            }
            else {
                my.game.kineticScrolling.isDisable = true;
            }

            //var scrollBar = null;
            //scrollBar = my.add.sprite(
            //    0,
            //    my._originalYOfRightPanel,
            //    "popup-achievement-scroll-bar",
            //    null,
            //    rightPanelWithMaskGroup.parent
            //);
            //scrollBar.x = rightPanelWithMaskGroup.parent.background.width - scrollBar.width - 50;
            //
            //var scrollButton = null;
            //scrollButton = my.add.sprite(
            //    scrollBar.x + 2,
            //    scrollBar.y + 1,
            //    "popup-achievement-scroll-button",
            //    null,
            //    rightPanelWithMaskGroup.parent
            //);
            //if (my.scrollBar != undefined) {
            //    my.scrollBar.destroy();
            //}
            //if (my.scrollButton != undefined) {
            //    my.scrollButton.destroy();
            //}
            //
            //my.scrollBar = scrollBar;
            //my.scrollButton = scrollButton;
            //
            //if (scrollBar.height > rightPanel.height) {
            //    scrollBar.alpha = 0;
            //    scrollButton.alpha = 0;
            //    var emptyCallback = function () {
            //    };
            //    rightPanel.mouseWheelCallback = emptyCallback;
            //    my.input.mouse.mouseWheelCallback = emptyCallback;
            //    return;
            //}
            //var height = my._maskRightPanelSize.height;
            ////scrollButton.position = {
            ////    x: rightPanel.x + rightPanel.width - rightPanel.width,
            ////    y: rightPanel.y
            ////};
            //
            //scrollButton.inputEnabled = true;
            //scrollButton.input.enableDrag();
            //scrollButton.input.allowHorizontalDrag = false;
            //scrollButton.input.useHandCursor = true;
            //scrollButton.input.boundsRect =
            //    new Phaser.Rectangle(
            //        scrollButton.x,
            //        scrollButton.y,
            //        scrollButton.width,
            //        height);
            //var isMoving = false;
            //var startY = 0;
            //
            //var begin = scrollButton.height;
            //var end = height;
            //var lengthScrollBtn = end - begin;
            //var lengthTable = rightPanel.height - height;
            ////var lengthScrollBtn = scrollBar.height - 20;
            ////console.log(rightPanel, rightPanel.y, rightPanel.height,
            ////    rightPanelWithMaskGroup, rightPanelWithMaskGroup.height)
            ////var lengthTable = scrollBar.height;
            ////var lengthTable = rightPanel.height;
            //if (isCollected) {
            //    scrollButton.y = scrollBar.y + my._currentScrollButtonY - my._originalYOfRightPanel;
            //    var per = (scrollButton.y - my._originalYOfRightPanel) / lengthScrollBtn;
            //    rightPanel.y = +0 - (lengthTable) * per;
            //}
            //
            //var updateTablePosition = function () {
            //    var per = (scrollButton.y - my._originalYOfRightPanel) / lengthScrollBtn;
            //    rightPanel.y = +0 - (lengthTable) * per;
            //    //console.log(scrollButton.y, lengthScrollBtn, per, (lengthTable) * per, rightPanel.y);
            //};
            //
            //var onMove = function (pointer) {
            //    if (isMoving) {
            //        updateTablePosition();
            //    }
            //};
            //my.input.addMoveCallback(onMove);
            //scrollButton.events.onDragStart.add(function (sprite, pointer) {
            //    isMoving = true;
            //    startY = pointer.clientY - begin;
            //}, my);
            //scrollButton.events.onDragStop.add(function (sprite, pointer) {
            //    isMoving = false;
            //    startY = 0;
            //}, my);

            /* ----------------- support mouse wheel ----------------- */
            //my.mouseWheel = function (event) {
            //    var percent = -0.05 * my.input.mouse.wheelDelta;
            //    var newY = scrollButton.y + percent * lengthScrollBtn;
            //    //console.log("Percent ", percent);
            //    //console.log("my.input.mouse.wheelDelta", my.input.mouse.wheelDelta);
            //    //console.log("newY", newY);
            //    //console.log("scrollBar.height", scrollBar.height);
            //    //if (newY > lengthScrollBtn - my._originalYOfRightPanel) {
            //    //    newY = lengthScrollBtn;
            //    //}
            //    if (newY < my._originalYOfRightPanel
            //        || newY > 751) {
            //        //newY = 0;
            //        return;
            //    }
            //    scrollButton.y = newY;
            //
            //    //if (scrollButton.y < 0
            //    //|| scrollButton.y > scrollBar.height) {
            //    //    return;
            //    //}
            //
            //    updateTablePosition();
            //}
            //
            //rightPanel.mouseWheelCallback = my.mouseWheel;
            //my.input.mouse.mouseWheelCallback = my.mouseWheel;
            /* ----------------- support mouse wheel ----------------- */


            /* ---------------- mask cho rightPanel ---------------- */


        };

        /**
         * Create and add an achievement group UI in left panel
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         * @param groupName: Name of Achievement Group (General, Game, Social)
         * @param groupIndex: Index of Achievement Group
         * @param numberOfNewAchievement: number of new completed Achievement (that hasn't collected yet)
         * @param isActive: boolen - check if this group is being activated
         * @returns {*} an Achivement Group UI
         */
        my.addAchievementGroupInLeftPanel = function (leftPanel,
                                                      rightPanel,
                                                      groupName,
                                                      groupIndex,
                                                      numberOfNewAchievement,
                                                      isActive) {
            var achievementGroup = my.add.group(leftPanel);
            achievementGroup.groupIndex = groupIndex;

            var spriteName = "";
            if (isActive) {
                spriteName = "popup-achievement-bg-group-active";
            } else {
                spriteName = "popup-achievement-bg-group-inactive"
            }

            var scaleButtonSwitchGroupAchievement = function (valueScale, background, achievementGroupName, notificationGroup) {
                my.resizeButtonAndTextAnimationScaleRatio(background, null, valueScale);
                my.resizeButtonAndTextAnimationScaleRatio(achievementGroupName, null, valueScale);
                my.resizeButtonAndTextAnimationScaleRatio(notificationGroup, null, valueScale);
                notificationGroup.y = 0;
                notificationGroup.x = 0;
            };

            // tạo background
            //var background = my.add.sprite(0, 0, spriteName, callback, achievementGroup);
            var background = Lobby.PhaserJS.createSpriteRectangle(
                my,
                0,
                0,
                function () {
                    scaleButtonSwitchGroupAchievement(0.8, background, achievementGroupName, notificationGroup);
                    my.time.events.add(150,
                        function () {
                            scaleButtonSwitchGroupAchievement(1, background, achievementGroupName, notificationGroup);
                        }, this);
                    my.switchAchievementGroupInLeftPanel(
                        leftPanel,
                        rightPanel,
                        groupIndex,
                        false
                    );
                },
                function () {
                },
                function () {
                },
                false, //useHandCursor
                achievementGroup,
                LobbyConfig.isDebug,
                spriteName);
            achievementGroup.background = background;

            // tạo tên achievementGroup (General, Game, Social)
            var achievementGroupName = my.add.text(
                0,
                22,
                groupName,
                {
                    font: "45px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#ffffff",
                    align: "center"
                },
                achievementGroup
            );
            Lobby.PhaserJS.centerXParent(achievementGroupName, background);

            var notificationGroup = my.add.group(achievementGroup);
            var numberOfNewAchievementAsText = null;
            if (numberOfNewAchievement != 0) {
                var notificationBackground = my.add.sprite(
                    background.width - 40,
                    -10,
                    "popup-achievement-bg-notification",
                    null,
                    notificationGroup);
                numberOfNewAchievementAsText = my.add.text(
                    0,
                    -3,
                    numberOfNewAchievement,
                    {
                        font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                        fill: "#ffffff",
                        align: "center"
                    },
                    notificationGroup
                );
                Lobby.PhaserJS.centerItemInBackground(numberOfNewAchievementAsText, notificationBackground);
                achievementGroup.numberOfNewAchievementAsText = numberOfNewAchievementAsText;
                achievementGroup.notificationBackground = notificationBackground;
            }

            //console.log("achievementGroup.height: ", achievementGroup.height);
            achievementGroup.position = {
                x: 50,
                //y: (achievementGroup.height + 10) * groupIndex + 275
                y: (110) * groupIndex + 275
            };
            return achievementGroup;
        };
        /**
         * Add all achievement groups UI to Left panel (General, Game, Social)
         * @param leftPanel: Left Panel contains Achivement Groups UI
         * @param rightPanel: Right Panel contains Achievement Info UI
         * @param isCollected: boolen - true if it is called after User collected achievement
         */
        my.addAllAchievementGroupInLeftPanel = function (leftPanel,
                                                         rightPanel,
                                                         isCollected) {
            // destroy cac achievement group da add truoc do
            for (var index = 0; index < 3; ++index) {
                var achievementGroup = my._achievementGroupArray[index];
                if (achievementGroup != undefined) {
                    //console.log("prepare to destroy: ", achievementGroup);
                    achievementGroup.destroy(true);
                    //console.log("after destroy: ", achievementGroup);
                }
            }

            my._achievementGroupArray = [];
            for (var index = 0; index < 3; ++index) {
                var groupName = "";
                switch (index) {
                    case 0:
                        groupName = my.selectlanguage.popup_achievement_group_title_general.text;
                        break;
                    case 1:
                        groupName = my.selectlanguage.popup_achievement_group_title_game.text;
                        break;
                    case 2:
                        groupName = my.selectlanguage.popup_achievement_group_title_social.text;
                        break;
                }
                var achievementGroup = my.addAchievementGroupInLeftPanel(
                    leftPanel,
                    rightPanel,
                    groupName,
                    index, //groupIndex
                    my.getNumberOfCompletedAchievementWhichIsNotCollectedOfGroupType(index), //numberOfNewAchievement
                    //(index == 0)
                    false
                );
                my._achievementGroupArray[index] = achievementGroup;
            }

            my.switchAchievementGroupInLeftPanel(leftPanel, rightPanel, my._currentChoosenGroup, isCollected);
        };
        /**
         * Get number of Completed Achievements that not Collected of a Specific Achievment Group
         * @param group_type: Specific Achievment Group Type (General, Game, Social)
         * @returns {number} number of achievement
         */
        my.getNumberOfCompletedAchievementWhichIsNotCollectedOfGroupType = function (group_type) {
            var count = 0;
            for (var index = 0; index < my._currentAchievementListOfUser.length; ++index) {
                var userAchievement = my._currentAchievementListOfUser[index];
                //if (userAchievement.group_type == group_type
                //    && userAchievement.is_complete
                //    && !userAchievement.is_collected
                //    && userAchievement.achievement_type !== 0) {
                //    ++count;
                //}
                if (userAchievement.group_type == group_type
                    && userAchievement.is_complete
                    && !userAchievement.is_collected) {
                    ++count;
                }
            }
            return count;
        };
        /**
         * Get number of All Completed Achievements that not Collected
         * @returns {number} number of achievements
         */
        my.getNumberOfAllCompletedAchievementWhichIsNotCollected = function () {
            var count = 0;
            for (var index = 0; index < 3; ++index) {
                count += my.getNumberOfCompletedAchievementWhichIsNotCollectedOfGroupType(index);
            }
            return count;
        };
        /**
         * Show Achievement Popup function
         */
        my.showAchievementPopUp = function () {
            if (my._currentAchievementListOfUser == null
                || my._currentAchievementListOfUser == undefined) {
                if(LobbyConfig.isDebug) console.log("warning: my._currentAchievementListOfUser is invalid: ", my._currentAchievementListOfUser);
                return;
            }
            var totalAchievementPointFromProfile = my._userData.profile.achievement_point;
            //isClicked = false;
            my.updateAllAchievementNotification();
            // tinh so luong achievement da complete nhung chua collect
            //my._achievementNotificationText.text = my.getNumberOfAllCompletedAchievementWhichIsNotCollected();

            var group = my.add.group();

            var background = my.add.sprite(
                0,
                0,
                "background_popup",
                function () {
                },
                group);
            background.scale.setTo(2); // reduce resolution 50%

            group.background = background;

            //var btnClose = Lobby.PhaserJS.createSpriteRectangleExt(
            //    my,
            //    background.width - 80,
            //    -15,
            //    //70,
            //    //70,
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleDown(btnClose);
            //        btnClose.frame = 0;
            //        var interval = setInterval(function () {
            //            my.closePopupWithAnimateDownNew(group);
            //            clearInterval(interval);
            //        }, 150);
            //    },
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleUp(btnClose);
            //        btnClose.frame = 0;
            //    },
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleUp(btnClose);
            //        btnClose.frame = 0;
            //    },
            //    group,
            //    LobbyConfig.isDebug,
            //    "btn-close-new"
            //);
            var btnClose = my.createButtonExitPopup(group, background.width - 80, -15);

            var achievementHeaderText = my.add.text(
                0,
                25,
                my.selectlanguage.popup_achievement_title.text,
                {
                    font: "47px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#eacaf2"
                },
                group
            );
            Lobby.PhaserJS.centerXParent(achievementHeaderText, background);
            //Lobby.PhaserJS.centerX(achievementHeaderText, group);

            var groupAchievement = my.add.group();
            group.add(groupAchievement);
            // 2016-05-05: Phuoc: left panel group
            var leftPanel = my.add.group(groupAchievement);

            var rightPanelWithMaskGroup = my.add.group(groupAchievement);
            rightPanelWithMaskGroup.position = {
                x: 360,
                y: my._originalYOfRightPanel
            };

            var maskRightPanel = my.add.graphics(0, 0);
            maskRightPanel.beginFill();
            maskRightPanel.beginFill(0xffffff);
            maskRightPanel.drawRect(
                0,
                0,
                my._maskRightPanelSize.width,
                my._maskRightPanelSize.height);
            maskRightPanel.endFill();
            rightPanelWithMaskGroup.add(maskRightPanel);

            // Duy, fix error undefine "data"
            var sprite = my.add.sprite(0, 0);
            sprite.addChild(maskRightPanel);
            sprite.visible = true;
            rightPanelWithMaskGroup.add(sprite);
            rightPanelWithMaskGroup.mask = maskRightPanel;

            var rightPanel = my.add.group(rightPanelWithMaskGroup);
            var totalAchievementPointsBackground = my.add.sprite(
                60,
                113,
                "popup-achievement-bg-total-achievement-points",
                function () {
                },
                group);
            var achievementPointsText = my.add.text(
                0,
                totalAchievementPointsBackground.y + 5,
                my.selectlanguage.popup_achievement_total_achievement_point.text,
                {
                    font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#eacaf2",
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 175
                },
                group
            );
            achievementPointsText.lineSpacing = -5;
            Lobby.PhaserJS.centerXItemInBackground(
                achievementPointsText,
                totalAchievementPointsBackground
            );

            //console.log("totalAchievementPointFromProfile: ", totalAchievementPointFromProfile);
            var achievementPointsNumber = my.add.text(
                175,
                190,
                totalAchievementPointFromProfile.toString(),
                {
                    font: "45px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#ffffff",
                    align: "center"
                },
                group
            );
            Lobby.PhaserJS.centerXItemInBackground(
                achievementPointsNumber,
                totalAchievementPointsBackground
            );
            my._achievementPointsNumber = achievementPointsNumber;

            // mặc định chọn group General
            my._currentChoosenGroup = 0;
            my.addAllAchievementGroupInLeftPanel(leftPanel, rightPanel, false);

            Lobby.PhaserJS.centerXWorld(group);
            group.y = 10;
            //my.openPopupWithAnimateUpNew(group);
            if (Lobby.Utils.isOldSchoolDevice()) {
                groupAchievement.visible = false;
            }
            Lobby.PhaserJS.scaleGroupForOptimize(group, true);

            if (LobbyConfig.useManagerForPopUp) {
                // pop up queue special
                var popUpData = ManagerForPopUp.createPopUpData(
                    my,
                    group,
                    function () {
                        if (Lobby.Utils.isOldSchoolDevice()) {
                            groupAchievement.alpha = 0;
                            groupAchievement.alpha = 0;
                            groupAchievement.visible = true;
                            my.add.tween(groupAchievement)
                                .to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
                        }
                    }
                );
                ManagerForPopUp.addPopUpToQueue(
                    popUpData,
                    true // isShow
                );
            } else {
                my.openPopupWithAnimateUpNew(group, null, false, false, function () {
                    if (Lobby.Utils.isOldSchoolDevice()) {

                        groupAchievement.alpha = 0;
                        groupAchievement.alpha = 0;
                        groupAchievement.visible = true;
                        my.add.tween(groupAchievement).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);

                        //}, 100);

                    }
                });
            }
        };
        /**
         * Get Achievement list from Server and show Achievement Popup
         */
        my.getAchievementListFromServerAndShowAchievementPopUp = function () {
            LobbyRequest.User.getAchievementList(
                function (data) {
                    //console.log("data return from LobbyRequest.User.getAchievementList: ", data);
                    my._currentAchievementListOfUser = data.member;
                    my.showAchievementPopUp();
                },
                my,
                true // isShowAndHideLoadingAnimation
            );
        };
        /**
         * Update all achievement group's notifications
         */
        my.updateAllAchievementNotification = function () {
            // tinh so luong achievement da complete nhung chua collect
            //my._achievementNotificationText.text = my.getNumberOfAllCompletedAchievementWhichIsNotCollected();
            my.updateAchievementNotification(my.getNumberOfAllCompletedAchievementWhichIsNotCollected());
            for (var index = 0; index < my._achievementGroupArray.length; ++index) {
                var achievementGroup = my._achievementGroupArray[index];
                if (achievementGroup == null || achievementGroup == undefined) {
                    continue;
                }
                if (achievementGroup.numberOfNewAchievementAsText != undefined) {
                    achievementGroup.numberOfNewAchievementAsText.text
                        = my.getNumberOfCompletedAchievementWhichIsNotCollectedOfGroupType(achievementGroup.groupIndex);
                    //Lobby.PhaserJS.centerItemInBackground(
                    //    achievementGroup.numberOfNewAchievementAsText,
                    //    achievementGroup.notificationBackground
                    //);
                }
            }

        };
        /**
         * Initialize Recent Winner Group
         */
        my.initRecentWinnerGroup = function () {
            if (my._recentWinnerGroup != null) {
                return;
            }
            var group = my.add.group();
            var recentWinnerBackground = my.add.sprite(
                0,
                0,
                "popup-recent-winner-background",
                null,
                group);

            var crownAsSprite = my.add.sprite(
                3,
                7,
                "crown-vip-border",
                null,
                group
            );
            crownAsSprite.anchor.x = 0;
            crownAsSprite.anchor.y = 0;
            crownAsSprite.scale.setTo(0.56, 0.56);
            crownAsSprite.width = 56;
            crownAsSprite.angle += 1;

            var frame = my.add.sprite(
                11,
                30,
                "frame_slot",
                null,
                group);
            frame.width = 130;
            frame.height = 130;
            group.add(frame);

            var avatarGroup = my.add.group(group);

            var avatar = my.add.sprite(
                0,
                0,
                "popup_profile_profile_avatar",
                null,
                avatarGroup
            );
            avatar.anchor.x = 0;
            avatar.anchor.y = 0;
            avatar.width = 120;
            avatar.height = 120;

            avatarGroup.x = 16;
            avatarGroup.y = 35;

            Lobby.PhaserJS.maskCircleGroup(avatarGroup, 120, my);
            var callbackReloadAvatarProfile = function (avatarData) {
                if (!Lobby.PhaserJS.tryLoadAvatar(avatar, avatarData.avatarURL, my)) {
                    Lobby.PhaserJS.createSpriteWithCircleMask(avatar, avatarData.avatarURL, 100, my);
                    //avatarData.avatarScale = 0.93;
                } else {

                }
                avatar.width = 120;
                avatar.height = 120;
                //Lobby.PhaserJS.scaleAspectSize(avatar, {width: 200, height: 200});
            };
            my.createAvatar(my._userData.profile, callbackReloadAvatarProfile);

            var recentWinnerInfoAsPhaserText = my.add.text(
                avatarGroup.x + 135,
                avatarGroup.y - 10,
                "",
                {
                    font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#FFFFFF",
                    wordWrap: true,
                    wordWrapWidth: 270
                    //align: "center"
                },
                group
            );

            group.recentWinnerBackground = recentWinnerBackground;
            group.crownAsSprite = crownAsSprite;
            group.avatarGroup = avatarGroup;
            group.avatar = avatar;
            group.recentWinnerInfoAsPhaserText = recentWinnerInfoAsPhaserText;

            group.alpha = 0;
            group.position = {
                x: LobbyConfig.width + 50,
                y: 100
            };
            my._recentWinnerGroup = group;
            group.add(avatarGroup);
            Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        };
        /**
         * Show Recent Winner Popup
         * @param beanData: winner's data
         */
        my.showRecentWinner = function (beanData) {
            if (my._recentWinnerGroup == null) {
                my.initRecentWinnerGroup();
            }
            my._recentWinnerGroup.alpha = 1;

            if (beanData.user_info.type != undefined
                && beanData.user_info.type != 0) {
                my._recentWinnerGroup.crownAsSprite.alpha = 1;
            } else {
                my._recentWinnerGroup.crownAsSprite.alpha = 0;
            }
            Lobby.PhaserJS.scaleAspectSize(my._recentWinnerGroup.avatar, {width: 200, height: 200});
            var callbackReloadAvatarProfile = function (avatarData) {
                if (!Lobby.PhaserJS.tryLoadAvatar(my._recentWinnerGroup.avatar, avatarData.avatarURL, my)) {
                    Lobby.PhaserJS.createSpriteWithCircleMask(my._recentWinnerGroup.avatar, avatarData.avatarURL, 100, my);
                    //avatarData.avatarScale = 0.93;
                } else {

                }
                Lobby.PhaserJS.scaleAspectSize(my._recentWinnerGroup.avatar, {width: 200, height: 200});
            };
            my.createAvatar(beanData.user_info, callbackReloadAvatarProfile);

            var user_name = beanData.user_info.name;
            if (user_name.length > 15) {
                user_name = user_name.substring(0, 15) + "...";
            }

            var textForGameName = "";
            if (beanData.game_name != undefined
                && beanData.game_name != "") {
                textForGameName = " from " + beanData.game_name + "'s Jackpot!";
            }

            my._recentWinnerGroup.recentWinnerInfoAsPhaserText.text = user_name + " just won $"
                + Lobby.Utils.formatNumberWithCommas(parseFloat(beanData.jackpot_value).toFixed(LobbyConfig.roundNumber))
                + textForGameName;

            var slideRecentWinner = function (to, callback, delayBeforeCallback) {
                var tween = my.add.tween(my._recentWinnerGroup);
                tween.to(
                    to,
                    500,
                    Phaser.Easing.Linear.None
                );
                tween.onComplete.add(function () {
                    my.time.events.add(delayBeforeCallback,
                        function () {
                            if (callback != undefined) {
                                callback();
                            }
                        }, this);
                }, my);
                tween.start();
            };

            // 2016-08-06: Phuoc: cách tính tọa độ x ở đây khác so với web version do lúc initGroup dùng scaleGroupForOptimize
            var paramForSlidingRightToLeft = {
                //x: LobbyConfig.width - my._recentWinnerGroup.recentWinnerBackground.width - 480
                x: my._recentWinnerGroup.position.x - my._recentWinnerGroup.width - 50
            };
            var paramForSlidingLeftToRight = {
                x: my._recentWinnerGroup.position.x
            };

            // 2016-05-23: Phuoc: cập nhật trạng thái của recent winner animation
            my._isShowingRecentWinnerAnimation = true;
            //console.log("set my._isShowingRecentWinnerAnimation to true", my._isShowingRecentWinnerAnimation);
            slideRecentWinner(paramForSlidingRightToLeft, function () {
                slideRecentWinner(paramForSlidingLeftToRight, function () {
                    my._isShowingRecentWinnerAnimation = false;
                    //console.log("set my._isShowingRecentWinnerAnimation to false", my._isShowingRecentWinnerAnimation);
                }, 10);
            }, 5000);
        };
        /**
         * Get current User's profile Data
         * @returns {null|*} current User's profile Data
         */
        my.getCurrentUserProfileData = function () {
            return my._userData.profile;
        };

        return my;
}(LobbyC.MainMenu || {}));

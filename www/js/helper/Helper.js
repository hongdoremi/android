/**
 * Created by Phan on 5/5/2016.
 */
var Helper = {
    Array:{
        createArrayBaseOnProperty: function(propertyName,array){
            var ar = [];
            for(var i = 0;i<array.length;i++){
                if(array[i][propertyName] != null) ar.push(array[i][propertyName]);
            }
            return ar;
        },
        indexOfBaseOnProperty: function(propertyName,value,array){
            for(var i = 0;i<array.length; i++){
                if(array[i][propertyName]===value) {
                   return i;
                }
            }
            return -1;
        },
        removeElementBaseOnProperty : function(propertyName,value, array, isStopOnFirstTime){
            if(Lobby.Utils.objectIsNull(isStopOnFirstTime)) isStopOnFirstTime = false;
            for(var i = 0;i<array.length; i++){
                if(array[i][propertyName]===value) {
                    Helper.Array.removeFromTo(array,i);
                    if(isStopOnFirstTime) break;
                }
            }
        },
        removeFromTo: function(array,from,to){
            var rest = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from : from;
            return array.push.apply(array, rest);
        }
    },
    Button:{
        enableBtn: function(button){
            button.tint = 0xffffff;
            button.textBtn.tint = 0xffffff;
            button.input.enabled = true;
        },
        disableBtn: function(button){
            button.tint = 0x777777;
            button.textBtn.tint = 0x958E8E;
            button.input.enabled = false;
        }

    },
    Time:{
        /**
         * Convert mili time to normal format time
         */
        milisecondTimeToNormalTime: function(millisecond,useFormalFormat){
            var time = Math.floor(millisecond/1000);
            var day = Math.floor(time/(3600*24));
            var hour = Math.floor(time/3600 - day*24);
            var minute =  Math.floor(time/60 - hour*60 - day*24*60);
            var second = Math.floor(time - minute*60 - hour*3600 - day*24*3600);

            if(useFormalFormat){
                if( second.toString().length < 2 ) second = "0"+second;
                if( minute.toString().length < 2 ) minute = "0"+minute;
            }
            return {day:day,hour:hour,minute:minute,second:second};
        },
        /**
         * Convert mili time to string normal format time
         */
        milisecondTimeToStringNormalTime: function(millisecond,useFormalFormat,splitChar){
            if(Lobby.Utils.objectIsNull(splitChar)) splitChar = ":";
            var time = Helper.Time.milisecondTimeToNormalTime(millisecond,useFormalFormat);
            var ar = [];
            for(var key in time){
                if (time.hasOwnProperty(key)) {
                    if (key === "day" && time[key] != 0 || key !== "day") ar.push(time[key]);
                }
            }
            return ar.join(splitChar);
            //return  time.hour + splitChar + time.minute + splitChar+ time.second ;
        },
        /**
         * Convert  time to string normal format time
         */
        timeToStringNormalTime: function(timeObject,useFormalFormat,splitChar){
            if(Lobby.Utils.objectIsNull(splitChar)) splitChar = ":";
            var ar = [];
            for(var key in timeObject){
                if (timeObject.hasOwnProperty(key)) {
                    if (key === "day" && timeObject[key] != 0 || key !== "day") ar.push(timeObject[key]);
                }
            }
            return ar.join(splitChar);
            //return  time.hour + splitChar + time.minute + splitChar+ time.second ;
        }
    }
    ,
    Sprite: {
        /**
         * load animation sprite (Example: image/a/animation_example_1, image/a/animation_example_2, image/a/animation_example_3)
         * @param context: loader
         * @param id: header key of animation (example: id = "animation_example_")
         * @param prefix: path file and id (example: prefix =
         * @param fix
         * @param start
         * @param end
         * @param step
         * @param lengthOfNumber
         * @param isUsingManager
         */
        loadAnimationSprite: function (context, id, prefix, fix, start, end, step, lengthOfNumber, isUsingManager) {
            if(Lobby.Utils.objectIsNull(isUsingManager)) isUsingManager = false;
            var idFix = 0;
            for (var i = start; i <= end; i += step) {
                if(isUsingManager) ManagerForImage.loadSprite(context,id + idFix, prefix + Helper.Number.formatNumberLength(i, lengthOfNumber) + fix + '?' + LobbyConfig.versionDisplay,true);
                else context.image(id + idFix, prefix + Helper.Number.formatNumberLength(i, lengthOfNumber) + fix + '?' + LobbyConfig.versionDisplay);
                idFix++;
            }
        }
    },
    Level: {
        /**
         * Calculate and return coin and crown when level up
         * @param previousLevel
         * @param currentLevel
         * @returns {{coin: number, crown: number}}
         */
        getCoinAndCrownBonusWhenLevelUp: function (previousLevel, currentLevel) {
            var levelJump = currentLevel - previousLevel;
            var checkLevel;
            var coinsBonus = 0;
            var rewardBonus = 0;
            if (levelJump > 0) {
                for (var i = 0; i < levelJump; i++) {
                    checkLevel = previousLevel + i + 1;
                    if (Lobby.Utils.objectNotNull(LobbyConfig.LevelUpBonusCoins[checkLevel + 1])) rewardBonus =  LobbyConfig.LevelUpBonusCoins[checkLevel + 1].coin_reward;
                    else rewardBonus = LobbyConfig.bonusCoinPerLevel;
                    if(LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus>0){
                        if((checkLevel+1)%10==0){
                            coinsBonus += rewardBonus *(LobbyConfig.boosterInfo.multiFactor1);
                        }else{
                            coinsBonus += rewardBonus *(LobbyConfig.boosterInfo.multiFactor2);
                        }
                    }else{
                        coinsBonus += rewardBonus;
                    }
                }
            }
            var crownBonus = 0;
            if (levelJump > 0) {
                for (var i = 0; i < levelJump; i++) {
                    checkLevel = previousLevel + i + 1;
                    if (Lobby.Utils.objectNotNull(LobbyConfig.LevelUpBonusCoins[checkLevel + 1])) crownBonus += LobbyConfig.LevelUpBonusCoins[checkLevel + 1].crown_reward;
                    else crownBonus += LobbyConfig.bonusCrownPerLevel;
                }
            }

            return {coin: coinsBonus, crown: crownBonus};
        }
    },
    Number: {
        /**
         * Get random number in range
         * @param min
         * @param max
         * @returns {*}
         */
        getRandomArbitrary: function(min, max) {
            return Math.random() * (max - min) + min;
        },
        /**
         * format number to higher or equal length
         * @param num
         * @param length
         * @returns {string}
         */
        formatNumberLength: function (num, length) {
            var r = "" + num;
            while (r.length < length) {r = "0" + r;}
            return r;
        },
        /**
         * Return length of element, deprecated
         * @param number
         * @returns {*}
         */
        lengthOfElement: function (number) {
            var i;
            for (i = 1; i * 10 <= number; i *= 10) ;
            return i;
        },
        /**
         * Init array from n, deprecated
         * @param n
         * @param isFirstElementNull
         * @returns {Array}
         */
        digitArr: function (n, isFirstElementNull) {
            if (n == 0) return new [0];
            var digits = [];
            for (; n != 0; n /= 10) digits.push(n % 10);
            if (isFirstElementNull) digits.push(10);
            digits.reverse();

            return digits;
        },
        /**
         * Format float  number like (1.0E) int number
         * @param number
         * @returns {string}
         */
        formatNumber: function (number) {
            number = parseFloat(number).toFixed(0) + '';
            var x = number.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {x1 = x1.replace(rgx, '$1' + ',' + '$2');}
            return x1 + x2;
        },
        /**
         * Unformat a number to float
         * @param text
         * @returns {Number}
         */
        unFormatNumber: function (text) {
            return parseFloat((text.replace(/[^0-9\.]+/g, "")));
        },
        /**
         * Convert a x y to global position
         * @param x
         * @param y
         * @param group
         * @param spriteWidth
         * @returns {{x: *, y: *}}
         */
        toGlobal: function (x, y, group, spriteWidth) {
            if (Lobby.Utils.objectIsNull(spriteWidth)) {
                return {
                    x: x + group.position.x,
                    y: y + group.position.y + 40
                };
            }
            return {
                x: x + group.position.x + spriteWidth,
                y: y + group.position.y + 40
            };
        }
    },
    Text: {
        /**
         * Convert a string to password
         * @param string
         * @returns {string}
         */
        convertToPass: function (string) {
            var res = "";
            for (var k = 0; k < string.length; k++) {res += '*';}
            return res;
        }
    }
};
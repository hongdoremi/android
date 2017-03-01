var ManagerForImage = new function(){
    var that = this;
    var imageCacheList = [];
    /**
     * Load sprite into cache
     * @param context
     * @param id id of sprite
     * @param path path to sprite
     * @param isUsingLoader using specific loader
     */
    this.loadSprite = function(context,id,path,isUsingLoader){
        if(Lobby.Utils.objectIsNull(isUsingLoader)) isUsingLoader = false;
        if(!isUsingLoader) context = context.load;
        context.image(id, LobbyC.GameSlot.getPrefixPath() + path);
        imageCacheList.push(id);
    };
    /**
     * Load sprite sheet into cache
     * @param context
     * @param id id of spritesheet
     * @param path path to spritesheet
     * @param width width of spritesheet
     * @param height height of spritesheet
     * @param frame number of frame
     * @param isUsingLoader using specific loader
     */
    this.loadSpriteSheet = function(context,id,path,width,height,frame,isUsingLoader){
        if(Lobby.Utils.objectIsNull(isUsingLoader)) isUsingLoader = false;
        if(!isUsingLoader) context = context.load;
        context.spritesheet(
            id, LobbyC.GameSlot.getPrefixPath() + path, width, height, frame
        );
        imageCacheList.push(id);
    };
    /**
     * Load atlas to cache
     * @param context
     * @param id id of atlas
     * @param pathImage path to atlas
     * @param pathJSON json path of atlas
     * @param isUsingLoader using specific loader
     */
    this.loadAtlas = function(context,id,pathImage,pathJSON,isUsingLoader){
        if(Lobby.Utils.objectIsNull(isUsingLoader)) isUsingLoader = false;
        if(!isUsingLoader) context = context.load;
        context.atlas(
            id, LobbyC.GameSlot.getPrefixPath() +  pathImage,LobbyC.GameSlot.getPrefixPath() +   pathJSON
        );
        imageCacheList.push(id);
    };
    /**
     * test, un used
     * @param context
     * @param id
     * @param filePath
     * @param isUsingLoader
     */
    this.loadSpriteFromBundle = function(context,id,filePath,isUsingLoader){
        if(Lobby.Utils.objectIsNull(isUsingLoader)) isUsingLoader = false;
        if(!isUsingLoader) context = context.load;
        filePath = cordova.file.dataDirectory +filePath;
        //resolveLocalFileSystemURL(filePath,function(entry){

            context.image(id,entry.toURL()  );
            imageCacheList.push(id);
        //});

    };
    /**
     * test, un used
     * @param context
     * @param id
     * @param filePath
     * @param width
     * @param height
     * @param frame
     * @param isUsingLoader
     */
    this.loadSpriteSheetFromBundle = function(context,id,filePath,width,height,frame,isUsingLoader){
        if(Lobby.Utils.objectIsNull(isUsingLoader)) isUsingLoader = false;
        if(!isUsingLoader) context = context.load;
        filePath = cordova.file.dataDirectory +filePath;
        resolveLocalFileSystemURL(filePath,function(entry){
            context.spritesheet(
                id,entry.toURL() , width, height, frame
            );
            imageCacheList.push(id);
        });


    };
    /**
     * Perform clear all data in cache
     * @param context
     */
    this.clearAllDataCache = function(context){
        var i = imageCacheList.length; while (i--) {
            try {
                context.cache.removeImage(imageCacheList[i], true);
            }catch(e){
                console.log(e);
            }}
        //for(var i =0;i<imageCacheList.length;i++){
        //    //context.load.removeFile('image',imageCacheList[i]);
        //    //console.log("Clear "+imageCacheList[i]+" number "+ i);
        //    //context.add.sprite(0,0,imageCacheList[i]);
        //}
        imageCacheList = [];
    }


};


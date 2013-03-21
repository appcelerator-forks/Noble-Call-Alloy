var fontSizeMap = {
    small: "12",
    medium: "14",
    large: "16",
    xlarge: "20"
};

function FontModel() {
    // Property: fontSizeName Gets/sets the font size name selected by the user.   
    Object.defineProperty(this, "sizeName", {
        get: function() { 
            return Ti.App.Properties.getString('FontSizeName', "medium");; 
        },
        set: function(size) {
            if (size in fontSizeMap) {
                Ti.App.Properties.setString('FontSizeName', size);
            }
        }
    });
    // Property: fontSize (readonly) Gets the font size selected by the user via fontSizeName.   
    Object.defineProperty(this, "size", {
        get: function() { 
            var sizeName = Ti.App.Properties.getString('FontSizeName', "medium");
            return fontSizeMap[sizeName];
        }
    });
}

module.exports = FontModel;
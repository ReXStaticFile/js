$(document).ready(function() {
    if (themehouse.styleSwitch.autodetectInitialized) {
        themehouse.styleSwitch.detectStyleType();
        window.matchMedia("(prefers-color-scheme: light)").addListener(function(e) {
            if (e.matches) {
                themehouse.styleSwitch.updateStyleType('light', true);
            }
        });

        window.matchMedia("(prefers-color-scheme: dark)").addListener(function(e) {
            if (e.matches) {
                themehouse.styleSwitch.updateStyleType('dark', true);
            }
        });
    }

    themehouse.styleSwitch.initStyleToggle();
});
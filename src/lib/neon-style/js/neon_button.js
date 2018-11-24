(function () {
    var NeonButton = function NeonButton(element) {
        UIHandler.UIComponent.call(this, element);
    };

    NeonButton.prototype = Object.create(UIHandler.UIComponent.prototype);

    NeonButton.prototype.constructor = NeonButton;

    NeonButton.prototype.Constant_ = {
        borderRadius: 2,
    };

    NeonButton.prototype.CssClasses_ = {
        OPUS_BUTTON: 'neon-button',
        OPUS_BUTTON_BACKGROUND: 'neon-button--background'
    };

    NeonButton.prototype.disable = function () {
        this.element_.disabled = true;
    };

    NeonButton.prototype.enable = function () {
        this.element_.disabled = false;
    };

    NeonButton.prototype.init = function () {
        var neonBorder = new NeonBorder(true);
        this.element_.setAttribute('data-hover-event', true);
        neonBorder.addNeonBorder(this.element_);
    };

    UIHandler.register({
        constructor: NeonButton,
        classAsString: 'NeonButton',
        cssClass: 'neon-js-button',
        widget: true
    });
})();

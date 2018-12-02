(function () {
    function NeonBorder() {

    }

    NeonBorder.prototype.Constant_ = {
        borderRadius: 8,
        borderOffset: 10
    };

    NeonBorder.prototype.CssClasses_ = {
        NEON_BORDER: 'neon-border'
    };

    NeonBorder.prototype.getComputedStyle = function(element, attribute, isNumber) {
        var computedStyle = null
        if(element.currentStyle) {
            computedStyle = element.currentStyle[attribute];
            return isNumber ? parseInt(computedStyle) : computedStyle;
        }

        if(window.getComputedStyle) {
            computedStyle = getComputedStyle(element)[attribute];
            return isNumber ? parseInt(computedStyle) : computedStyle;
        }


    };

    NeonBorder.prototype.init = function (width, height, neonBorderColor) {

        this.width = width;
        this.height = height;
        this.borderColor = neonBorderColor ? neonBorderColor : 'black';
        this.hasHoverEvent = !!this.targetElement.getAttribute('data-hover-event');

        this.element_ = document.createElement('canvas');
        this.element_.classList.add(this.CssClasses_.NEON_BORDER);
        this.element_.width = this.width;
        this.element_.height = this.height;
        this.element_.style.top = '-' + this.Constant_.borderOffset + 'px';
        this.element_.style.left = '-' + this.Constant_.borderOffset + 'px';

        if(this.hasHoverEvent) {
            this.element_.addEventListener('mouseover', this.makeBackgroundOverStyle.bind(this));
            this.element_.addEventListener('mouseout', this.makeBackgroundStyle.bind(this));
        }

        window.addEventListener('resize', this.resizeBorder.bind(this));

        this.makeBackgroundStyle();

        this.targetElement.neonBorder = this

        return this.element_;
    };

    NeonBorder.prototype.resizeBorder = function () {
        var neonBorderWidth = this.targetElement.getBoundingClientRect().width + this.Constant_.borderOffset * 2;
        var neonBorderHeight = this.targetElement.getBoundingClientRect().height + this.Constant_.borderOffset * 2;
        this.element_.width = neonBorderWidth;
        this.element_.height = neonBorderHeight;
        this.makeBackgroundStyle();
    }

    NeonBorder.prototype.makeNeonBorder = function (strokeWidth, shadowBlur, offset) {

        var context = this.element_.getContext('2d');
        var width = this.element_.width;
        var height = this.element_.height;

        context.clearRect(0, 0, width, height);
        context.beginPath();

        this.roundRect(context,
            this.borderColor,
            strokeWidth,
            this.Constant_.borderRadius,
            strokeWidth + offset,
            strokeWidth + offset,
            width - (strokeWidth + offset) * 2,
            height - (strokeWidth + offset) * 2,
            true,
            shadowBlur);

        context.closePath()
    };

    NeonBorder.prototype.addNeonBorder = function(parentElement) {
        this.targetElement = parentElement;
        var neonBorderWidth = parentElement.getBoundingClientRect().width + this.Constant_.borderOffset * 2;
        var neonBorderHeight = parentElement.getBoundingClientRect().height + this.Constant_.borderOffset * 2;
        var neonBorderColor = this.getComputedStyle(parentElement, 'borderColor');
        var neonBorder = this.init(neonBorderWidth, neonBorderHeight, neonBorderColor);
        parentElement.insertBefore(neonBorder, parentElement.children[0]);

    };

    NeonBorder.prototype.makeBackgroundOverStyle = function () {
        this.makeNeonBorder(4, 20, 9);
    };

    NeonBorder.prototype.makeBackgroundStyle = function () {
        this.makeNeonBorder(3, 10, 10);
    };

    NeonBorder.prototype.roundRect = function (context, color, strokeWidth, radius, x, y, width, height, hasShadow, shadowBlur) {

        context.beginPath();
        context.arc(x + radius, y + radius, radius, Math.PI, 3 * Math.PI / 2);

        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);

        context.arc(x + width - radius, y + radius, radius, 3 * Math.PI / 2, 2 * Math.PI);

        context.moveTo(x + width, y + radius);
        context.lineTo(x + width, y + height - radius);

        context.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);

        context.moveTo(x + width - radius, y + height);
        context.lineTo(x + radius, y + height);

        context.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);

        context.moveTo(x, y + height - radius);
        context.lineTo(x, y + radius);

        context.strokeStyle = color;
        context.lineWidth = strokeWidth;

        if(hasShadow){
            context.shadowColor = this.borderColor;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = shadowBlur;
        }

        context.stroke();
    };

    window.NeonBorder = NeonBorder;

    window.onload = function() {
        setTimeout(function() {
            Array.apply(null, document.querySelectorAll('.neon-js-border')).forEach(function (parent) {
                var neonBorder = new NeonBorder();
                neonBorder.addNeonBorder(parent);
            });
        },0)

    }
})();

"use strict";

window._isDebagMode = true;

var Tooltip = {
    tooltip: undefined,
    target: undefined,
    bindEvents: function() {
        Tooltip.tooltip = document.getElementById('tooltip');
        var targets = document.querySelectorAll('[rel=tooltip]' );
        for (var i = 0; i < targets.length; ++i) {
            targets[i].addEventListener('click', Tooltip.show);
            //targets[i].addEventListener('mouseleave', Tooltip.hide);
        }
        Tooltip.tooltip.addEventListener('click', Tooltip.hide);
        window.addEventListener('resize', Tooltip.show);
        window.addEventListener('click', function(){
           var classListTooltip =  Tooltip.tooltip.classList.contains('show')
            console.log("classListTooltip",classListTooltip);
           if(classListTooltip){
               Tooltip.tooltip.style.display = 'none';
               Tooltip.tooltip.className = Tooltip.tooltip.className.replace('show', '');
           }
        },true);

    },

    show: function()
    {
        console.log('show');
        Tooltip.target = this;
        var tip = Tooltip.tooltip;
        if( !tip || tip == '' ) {
            return false;
        }
        Tooltip.tooltip.style.display = 'block';
        if( window.innerWidth < Tooltip.tooltip.offsetWidth * 1.5 ) {
            Tooltip.tooltip.style.maxWidth = (window.innerWidth / 2)+'px';
        }
        else {
            Tooltip.tooltip.style.maxWidth = 320 + 'px';
        }

        var pos_left = Tooltip.target.offsetLeft + ( Tooltip.target.offsetWidth / 2 ) - ( Tooltip.tooltip.offsetWidth / 2 ),
            pos_top  = Tooltip.target.offsetTop - Tooltip.tooltip.offsetHeight - 20;
        Tooltip.tooltip.className = '';
        console.log('('+pos_left+', '+pos_top+')')
        if( pos_left < 0 )
        {
            pos_left = Tooltip.target.offsetLeft + Tooltip.target.offsetWidth / 2 - 20;
            Tooltip.tooltip.className += ' left';
        }

        if( pos_left + Tooltip.tooltip.offsetWidth > window.innerWidth ) {
            pos_left = Tooltip.target.offsetLeft - Tooltip.tooltip.offsetWidth + Tooltip.target.offsetWidth / 2 + 20;
            Tooltip.tooltip.className +=' right';
        }

        if( pos_top < 0 )
        {
            var pos_top  = Tooltip.target.offsetTop + Tooltip.target.offsetHeight;
            Tooltip.tooltip.className += ' top';
        }

        Tooltip.tooltip.style.left = pos_left + 'px';
        Tooltip.tooltip.style.top = pos_top + 'px';

        Tooltip.tooltip.className += ' show';
    },
    hide: function()
    {
        console.log('hide');
        Tooltip.tooltip.style.display = 'none';
        Tooltip.tooltip.className = Tooltip.tooltip.className.replace('show', '');
    }
};
function accordion() {
    console.log("accordion");
    var accordionItems = document.getElementsByClassName('panel');
    var isAccordionItems = accordionItems.length <= 0;
    if (window._isDebagMode) console.log(isAccordionItems);

    if (isAccordionItems) {
        return false;
    }

    var accItem = document.getElementsByClassName('panel');
    var accHD = document.getElementsByClassName('accordionItemHeading');

    for (var i = 0; i < accHD.length; i++) {
        accHD[i].addEventListener('click', toggleItem, false);
    }

    function toggleItem() {
        var itemClass = this.parentNode.className;

        for (var i = 0; i < accItem.length; i++) {
            accItem[i].className = 'panel close';
        }

        if (itemClass == 'panel close') {
            this.parentNode.className = 'panel active';
        }
    }
}

function init() {
    console.log("init");
    accordion();
    Tooltip.bindEvents();
}

window.onload = function () {
    console.log("DOM is loaded ");
    init();
};
<template>
    <div class="home">
        <div class="wrapper clearfix">
            <div class="main-wrapper">
                <header class="neon-js-border neon-header">
                    <span>Neon Style</span>
                </header>
                <div class="content-wrapper">
                    <nav class="neon-js-border neon-left">
                        <ul class="neon-left-menu">
                            <li :class="{'menu--selected' : selectedIndex === index}"
                                v-for="(item, index) in [1,2,3,4,5,6]"
                                @click="selectMenu(index)">MENU {{item}}</li>
                        </ul>
                        <div data-hover-event="true"
                             class="neon-js-border neon-left__item--selected"
                             :style="computedBorderY"></div>
                    </nav>
                    <main>
                        <button class="copy-button neon-button neon-js-button">BUTTON</button>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        computed: {
            computedBorderY() {
                return 'transform:translate(0,' + (this.selectedIndex * (this.itemHeight) + 20) + 'px);';
            }
        },
        data() {
            return {
                selectedIndex: 0,
                itemHeight: 0,
                borderForSelected: null
            }
        },
        mounted() {

            this.itemHeight = parseInt(getComputedStyle(document.querySelector('.menu--selected')).height);
            this.borderForSelected = document.querySelector('neon-left__item--selected')


            document.querySelectorAll('.neon-js-border').forEach(function (parent) {
                var neonBorder = new NeonBorder();
                neonBorder.addNeonBorder(parent);
            });
        },
        methods: {
            selectMenu(index) {
                this.selectedIndex = index;
                console.log(this.computedBorderY)
            }
        }
    }
</script>

<style scoped>

    .wrapper {
        background-color: rgba(0, 0, 0, .9);
        width: 100%;
        min-width: 720px;
    }

    .main-wrapper {
        animation: switch-on 2s;
        height: 100vh;
        padding: 16px;
        box-sizing: border-box;
    }

    header {
        position: relative;
        color: #00ffd0;
        padding: 20px 30px;
        text-shadow: 0 0 2px #00ffd0;
        transition: text-shadow 0.2s ease-out;
        font-size: 30px;
    }

    .content-wrapper {
        height: calc(100% - 110px);
    }

    .neon-left {
        width: 300px;
        height: 500px;
        position: absolute;
        border-color: #ff00e9;
    }

    main {
        margin: 20px 0 0 320px;
        width: calc(100% - 320px);
        height: 100%;
        border-color: #5dff00;
        padding: 15px;
    }

    .neon-left-menu {
        padding-top: 10px;
    }

    .neon-left-menu li {
        display: block;
        cursor: pointer;
        padding: 30px 40px;
        position: relative;
        color: #ff00e9;
        border-color: #ff00e9;
        text-shadow: 0 0 2px #ff00e9;
        transition: text-shadow 0.2s ease-out;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .neon-left-menu li.menu--selected {
        color: #5dff00;
    }

    .neon-left .neon-left__item--selected {
        width: 260px;
        height: 48px;
        border-color: #5dff00;
        position: absolute;
        left: 20px;
        top: 0;
        transform: translate(0, 12px);
        transition: all .3s ease-in-out;
    }

    .neon-left-menu li:hover {
        text-shadow: 0 0 100px #ff00e9;
    }

</style>
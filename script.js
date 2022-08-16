new Vue({
    el: '#app',
    data: {
        runing: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0;
        },
    },
    methods: {
        iniciar(valor) {
            this.runing = valor;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        atacar(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player');
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
            }
        },
        hurt(atr, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0;
            const hurt = this.getRandom(min + plus, max + plus);
            this[atr] = Math.max(this[atr] - hurt, 0);
            this.rigisterLog(`${source} atingiu ${target} com ${hurt}.`, cls);
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value);
        },
        healAndHurt() {
            const curou = this.heal(10, 15);
            console.log(curou)
            this.rigisterLog(`Jogador se curou ${curou}.`, 'curar');
            this.hurt('playerLife', 7, 12, false,'Monstro', 'Jogador', 'monster');
        },
        heal(min, max) {
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            return heal;

        },
        rigisterLog(text, cls) {
            this.logs.unshift({ text, cls })
        }

    },
    watch: {
        hasResult(value) {
            if (value) this.runing = false;
        }
    }

})

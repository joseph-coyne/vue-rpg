<template>
  <div class="battle">
    <div class="battle-text">
      <h1>A {{monsters[$parent.i].name}} Appeared!</h1>
      <div class="battle-log">
        <ul v-for="actionLog in actionLogs" >
          <li>{{actionLog}}</li>
        </ul>
      </div>
    </div>
    <ActionBar @attack="attack" @heal="heal" @special-attack="specialAttack" />
  </div>
</template>
<style scoped>
.battle-text {
  margin: auto 0;
  padding: 4%;
  background-image: url("../../public/textbg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50%;
  bottom: 50%;
  left: 20%;
  position: absolute;
  text-align: center;
  height: 100px; 
  font-family: 'Quintessential', cursive;
  

}
.battle-log {
  overflow: hidden;
  overflow-y:scroll;
  font-family: 'Quintessential', cursive;

}
ul {
    list-style-type: none;
  margin: 0;
  padding: 0;
  
}
.action-bar {
  /* border-style: solid;
  border-width: 10px;
  width: 340px; */
  position: absolute;
  bottom: 18%;
  left: 38%;
  
}

</style>

<script>
import ActionBar from './ActionBar.vue';

export default {
  components: {
    ActionBar,
  },
  props: {
    player: Object,
    monsters: Array,
  },
  data() {
    return {
      playerHealth: this.player.health,
      playerDamage: "",
      specialDamage: "",
      enemyDamage: "",
      playerHeal: "",
      actionLogs: [],
      battleLogs: [],
    }
  },
  watch: {
    enemyHealth() {
      if (this.enemyHealth <= 0) {
        var goldDrop = this.numberRoll(10, 15);
        var exp = this.numberRoll(15, 30);
        alert("You Defeated The Monster! The Monster dropped " + goldDrop + " gold! You gained " + exp + " XP!");
        this.$parent.player.gold += goldDrop;
        this.$parent.player.exp += exp;
        this.$parent.inFight = false
        this.$parent.i += 1;
      }
    },
    playerHealth() {
      if (this.playerHealth <= 0) {
        alert("You Died");
        window.location.reload()
      }
    },
    playerExp() {
        if(this.player.exp >= 100) {
          this.$parent.player.level += 1;
          alert("You gained a level!");
          this.$parent.playerExp -= 100;
          localStorage.player = this.$parent.player
        }
      }
    },
    computed: {
      battleText() {
        this.battleLogs = this.actionLogs 
      }
    },
  methods: {
    playerAttack() {
      this.playerDamage = this.numberRoll(10, 15)
      this.actionLogs.push("You attacked for " + this.playerDamage + " damage.");
      this.$parent.monsters[this.$parent.i].health -= this.playerDamage;
    },
    specialAttack() {
      this.actionLogs = []
      if(this.$parent.player.mana >= 25) {
        this.$parent.player.mana -= 25;
        this.specialDamage = this.numberRoll(15, 25);
        this.actionLogs.push("You attacked for " + this.specialDamage + " damage.");
        this.$parent.monsters[this.$parent.i].health -= this.specialDamage;
        this.checkWin();
        this.enemyAttack();
      } else {
        this.actionLogs.push("Not enough Mana.");
      }
    },
    enemyAttack() {
      this.enemyDamage = this.numberRoll(5, 12);
      this.actionLogs.push("Enemy attacked for " + this.enemyDamage + " damage.");
      this.$parent.player.health -= this.enemyDamage;
      this.playerHealth = this.$parent.player.health;

    },
    attack() {
      this.actionLogs = []
      this.playerAttack();
      this.checkWin();
      this.enemyAttack();
      
      
    },
    heal() {
      this.actionLogs = []
      if (this.$parent.player.mana >= 20) {
        this.$parent.player.mana -= 20;
        this.playerHeal = this.numberRoll(10, 30)
        this.actionLogs.push("You restored " + this.playerHeal + " health.");      
        this.$parent.player.health += this.playerHeal;
        this.enemyAttack();
      } else {
        this.actionLogs.push("Not enough Mana.");
      }
    },
    numberRoll(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsters[this.$parent.i].health <= 0) {
        var goldDrop = this.numberRoll(10, 15);
        var exp = this.numberRoll(15, 30);
        alert("You Defeated The Monster! The Monster dropped " + goldDrop + " gold! You gained " + exp + " XP!");
        this.$parent.player.gold += goldDrop;
        this.$parent.player.exp += exp;
        this.$parent.inFight = false
        this.$parent.i += 1;
      }
    }
  },
}

</script>

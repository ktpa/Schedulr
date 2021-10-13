<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="/"
      ><img class="header-logo" src="../res/images/logo.png" alt="logo"
    /></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse class="header-nav-bar" id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :class="{ active: this.$route.name === 'home' }" href="/"
          >Home
        </b-nav-item>
        <b-nav-item
          :class="{ active: this.$route.name === 'create-meeting' }"
          href="/create-meeting"
          >Create Meeting
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown class="profile-button" right>
          <template #button-content> <ProfileButton /> </template>
          <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          <b-dropdown-item href="/blocked-times">Blocked Times</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import ProfileButton from './ProfileButton.vue'
export default {
  components: { ProfileButton },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style>
.header-logo {
  object-fit: cover;
  height: 35px;
}
.header-nav-bar .active .nav-link {
  color: #3751fe !important;
  font-weight: bold;
}
.profile-button .dropdown-toggle {
  display: flex;
  flex-direction: row;
}
.profile-button a:after {
  margin-top: 0.6em;
}
</style>

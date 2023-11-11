<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import { useAuthentication } from '@core/services/UseAuthentication'
import { ref, onBeforeMount, onMounted } from 'vue'
import { useSidemenu } from '../services/UseSidemenu'
import type { Menu } from '../LayoutTypes'

const { isAuthenticated } = useAuthentication()
const { sidemenus, isOffcanvasSidemenu, isClosedSidemenu, openSidemenu, closeSidemenu } =
  useSidemenu()

/** List of menus. */
const menuList = ref<Menu[]>(getMenuItems())

const menuItem = ref<HTMLElement[] | []>([])
const menuItemOffcanvas = ref<HTMLElement[] | []>([])
const subMenuItem = ref<HTMLElement[] | []>([])
const subMenuItemOffcanvas = ref<HTMLElement[] | []>([])

onBeforeMount(() => {
  if (!isAuthenticated.value) closeSidemenu()
  else openSidemenu()
})

onMounted(() => {
  // Expand active menu when login redirect user.
  sidemenus.subscribe((menu) => {
    collapseAllMenu()
    expandActiveMenu(menu)
  })
})

/**
 * Get menu from storage.
 * @returns Menu items
 */
function getMenuItems(): Menu[] {
  const sessionStorageMenuItems = sessionStorage.getItem('MenuItems')
  const localStorageMenuItems = localStorage.getItem('MenuItems')

  if (sessionStorageMenuItems) return JSON.parse(sessionStorageMenuItems)
  else if (localStorageMenuItems) return JSON.parse(localStorageMenuItems)
  else
    return [
      {
        name: 'showcase',
        title: 'پیش نمایش',
        icon: 'mgc_palette_2_line',
        subMenu: [
          {
            name: 'toast',
            title: 'اعلان'
          }
        ]
      }
    ]
}

/** Collapse active route menu */
function collapseAllMenu() {
  /* Normal Mode */
  menuItem.value.forEach((menuElement) => {
    menuElement.setAttribute('aria-expanded', 'false')
    menuElement.classList.add('collapsed')
  })

  subMenuItem.value.forEach((subMenuElement) => {
    subMenuElement.classList.add('collapse')
    subMenuElement.classList.remove('show')
  })

  /* Offcanvas Mode */
  menuItemOffcanvas.value.forEach((menuElementOffcanvas) => {
    menuElementOffcanvas.setAttribute('aria-expanded', 'false')
    menuElementOffcanvas.classList.add('collapsed')
  })

  subMenuItemOffcanvas.value.forEach((subMenuElementOffcanvas) => {
    subMenuElementOffcanvas.classList.add('collapse')
    subMenuElementOffcanvas.classList.remove('show')
  })
}

/** Expand active route menu */
function expandActiveMenu(name: string) {
  /* Normal Mode */
  const menuElement = menuItem.value.find((item) => item.getAttribute('id') === name)
  const subMenuElement = subMenuItem.value.find(
    (item: any) => item.getAttribute('id')?.split('-')[2] === name
  )

  if (menuElement && subMenuElement) {
    menuElement.setAttribute('aria-expanded', 'true')
    menuElement.classList.remove('collapsed')

    subMenuElement.classList.remove('collapse')
    subMenuElement.classList.add('show')
  }

  /* Offcanvas Mode */
  const menuElementOffcanvas = menuItemOffcanvas.value.find(
    (item) => item.getAttribute('id') === name
  )
  const subMenuElementOffcanvas = subMenuItemOffcanvas.value.find(
    (item) => item.getAttribute('id')?.split('-')[2] === name
  )

  if (menuElementOffcanvas && subMenuElementOffcanvas) {
    menuElementOffcanvas.setAttribute('aria-expanded', 'true')
    menuElementOffcanvas.classList.remove('collapsed')

    subMenuElementOffcanvas.classList.remove('collapse')
    subMenuElementOffcanvas.classList.add('show')
  }
}
</script>

<template>
  <aside class="sidebar" :class="{ closed: isClosedSidemenu }">
    <!-- ردیف تب ها -->
    <div
      class="toggle-panel-active-tabs mx-3"
      :class="{
        'tab-content-wide': isOffcanvasSidemenu || isClosedSidemenu,
        'tab-content-compact': !isOffcanvasSidemenu && !isClosedSidemenu,
        'tab-content-close': !isAuthenticated
      }"
    >
      <!-- <block-active-tabs-bar></block-active-tabs-bar> -->
    </div>

    <div class="toggle-panel p-2">
      <!-- حالت جم شونده -->
      <a
        class="toggle-panel-button"
        :data-bs-toggle="isOffcanvasSidemenu ? 'offcanvas' : ''"
        :data-bs-target="isOffcanvasSidemenu ? '#offcanvasRight' : ''"
        :aria-controls="isOffcanvasSidemenu ? 'offcanvasRight' : ''"
        :class="{ closed: isClosedSidemenu }"
        @click="isClosedSidemenu ? openSidemenu() : closeSidemenu()"
      >
        <div
          class="toggle-panel-button-icon"
          :class="{
            closed: isClosedSidemenu,
            'no-icon': !isAuthenticated
          }"
        >
          <i
            :class="{
              mgc_menu_fill: isOffcanvasSidemenu || isClosedSidemenu,
              mgc_more_2_fill: !isOffcanvasSidemenu && !isClosedSidemenu
            }"
          ></i>
        </div>
      </a>
      <!--/ حالت جم شونده -->
    </div>

    <!-- منو اصلی -->
    <div class="menu-panel">
      <!-- ایجاد منو -->
      <div class="sidebar-nav flex-shrink-0 p-2">
        <ul class="list-unstyled ps-0 pb-1 small" v-for="menu of menuList" :key="menu.name">
          <li class="nav-item">
            <a
              ref="menuItem"
              class="nav-link collapsed"
              data-bs-toggle="collapse"
              aria-expanded="false"
              :id="menu.name"
              :data-bs-target="'#components-nav-' + menu.name"
            >
              <i class="text-start" :class="menu.icon ? menu.icon : 'mgc_question_line'"></i>

              <span class="p-2">
                {{ menu.title }}
              </span>

              <i v-if="menu.subMenu && menu.subMenu.length > 0" class="p-2 mgc_down_line"></i>
            </a>

            <!-- زیر منو -->
            <div class="show" v-if="menu.subMenu && menu.subMenu.length > 0">
              <ul
                ref="subMenuItem"
                class="nav-content collapse"
                data-bs-parent="#sidebar-nav"
                :id="'components-nav-' + menu.name"
              >
                <li class="my-2" v-for="subMenu of menu.subMenu" :key="subMenu.name">
                  <RouterLink :to="'/' + menu.name + '/' + subMenu.name" active-class="active">
                    <span class="p-2">
                      {{ subMenu.title }}
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <!--/ زیر منو -->
          </li>
          <!--/ منو اصلی -->

          <!-- جدا کننده -->
          <hr class="sidebar-divider" />
        </ul>
      </div>
      <!--/ ایجاد منو -->
    </div>

    <div class="toggle-panel-buttom p-2"></div>

    <!-- ایجاد منو جانبی -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-body">
        <div class="menu-panel">
          <!-- متن اصلی -->
          <a class="sidebar-brand d-flex align-items-center justify-content-center offcanvas-body">
            <div class="sidebar-brand-icon rotate-n-15"></div>

            <RouterLink class="sidebar-brand-text mx-3" to="/home/dashboard">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </RouterLink>
          </a>
          <!--/ متن اصلی -->

          <!-- جدا کننده -->
          <hr class="sidebar-divider my-0" />

          <!-- ایجاد منو -->
          <div class="sidebar-nav flex-shrink-0 p-2">
            <ul class="list-unstyled ps-0 pb-1 small" v-for="menu of menuList" :key="menu.name">
              <li class="nav-item">
                <a
                  ref="menuItemOffcanvas"
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  :id="menu.name"
                  :data-bs-target="'#components-nav-' + menu.name"
                >
                  <i class="text-start" :class="menu.icon ? menu.icon : 'mgc_question_line'"></i>

                  <span class="p-2">
                    {{ menu.title }}
                  </span>

                  <i v-if="menu.subMenu && menu.subMenu.length > 0" class="p-2 mgc_down_line"></i>
                </a>

                <!-- زیر منو -->
                <div v-if="menu.subMenu && menu.subMenu.length > 0">
                  <ul
                    ref="subMenuItemOffcanvas"
                    class="nav-content collapse"
                    data-bs-parent="#sidebar-nav"
                    :id="'components-nav-' + menu.name"
                  >
                    <li class="my-2" v-for="subMenu of menu.subMenu" :key="subMenu.name">
                      <RouterLink :to="'/' + menu.name + '/' + subMenu.name" active-class="active">
                        <span class="p-2">
                          {{ subMenu.title }}
                        </span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
                <!--/ زیر منو -->
              </li>
              <!--/ منو اصلی -->
            </ul>
          </div>
          <!--/ ایجاد منو -->
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
a {
  color: var(--sidemenu-item-color);
  text-decoration: none;
  background-color: transparent;
}

/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
.sidebar {
  position: fixed;
  top: var(--header-height);
  right: 0;
  z-index: var(--z-index-sidemenu);
  overflow: hidden;
  transition: var(--main-transition);

  .toggle-panel-active-tabs {
    position: fixed;
    left: 2px;
    top: calc(var(--header-height) + 0.7rem);
    transition: var(--main-transition);

    &.tab-content-wide {
      width: calc(100% - 2.25rem);
    }

    &.tab-content-compact {
      width: calc(100% - (var(--sidemenu-width) + 28px));
    }

    &.tab-content-close {
      width: 13%;
      opacity: 0;
    }
  }

  .menu-panel::-webkit-scrollbar {
    display: none;
  }

  .menu-panel {
    width: var(--sidemenu-width);
    height: calc(100vh - var(--footer-height) - var(--header-height));
    background: var(--sidemenu-main-color);
    overflow-y: scroll;
    scrollbar-width: none;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 35px;
      height: 30px;
      width: 30px;
      box-shadow: 0 13px 0 0 var(--sidemenu-main-color);
      border-bottom-left-radius: 35%;
      background: transparent;
    }

    &:before {
      top: 0;
      transform: rotate(180deg);
    }

    &:after {
      bottom: 14px;
      transform: rotate(270deg);
    }
  }

  .toggle-panel {
    position: relative;
    text-align: center;
    width: 65px;
    height: var(--header-height);
    float: left;
    padding: 0;
    left: -2px;

    .toggle-panel-button {
      cursor: pointer;
      position: relative;
      top: 0.95rem;

      .toggle-panel-button-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--sidemenu-main-color);
        height: 3rem;
        border-left: 2px solid var(--main-color);

        &.no-icon {
          display: none;
          opacity: 0;
        }

        i {
          &::before {
            font-size: 2rem;
            color: var(--main-item-color) !important;
          }
        }
      }
    }
  }

  .sidebar-brand {
    position: sticky;
    height: 4.4rem;
    font-weight: 800;
    top: 0;
    background-color: rgba(var(--sidemenu-main-color), 0.5);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    z-index: var(--z-index-sidemenu-header);

    .sidebar-brand-text {
      cursor: pointer;
      color: var(--main-hilight-color);
      font-size: 1.4rem;
      font-weight: 900;
    }
  }

  hr.sidebar-divider {
    position: sticky;
    top: 4.4rem;
    margin: 0.8rem 1rem 0 1rem;
    z-index: var(--z-index-sidemenu-header);
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #8b8b8b;
}

.sidebar-nav {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: var(--z-index-sidemenu);

  ul {
    padding: 0;
    margin-bottom: 0.5rem;

    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
}

.sidebar-nav .nav-item {
  margin-bottom: 0px;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: var(--sidemenu-item-color);
  background-color: var(--sidemenu-main-color);
  transition: 0.3;
  margin: 8px 13px 0 13px;
  border-radius: 4px;
  cursor: pointer;
}

.sidebar-nav .nav-link i {
  display: flex;
  padding: 0rem 0.5rem 0rem 0.5rem;
  color: var(--sidemenu-item-color);
  font-size: 1.5rem;
  transition: var(--main-transition);
}

.sidebar-nav .nav-link span {
  font-size: 1.03rem;
  font-weight: 850;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: var(--main-transition);
  width: 100vw;
}

/* Menu Items */
.sidebar-nav .nav-link.collapsed {
  color: var(--sidemenu-item-color);
  background-color: var(--sidemenu-main-color);
}

.sidebar-nav .nav-link.collapsed i {
  color: var(--sidemenu-item-icon-color);
}

.sidebar-nav .nav-link:hover {
  color: var(--sidemenu-hilight-color);
  background: var(--main-color);
  border-radius: 4px;
}

.sidebar-nav .nav-link:hover i {
  color: var(--sidemenu-item-color);
}

.sidebar-nav .nav-link .mgc_down_line {
  margin-right: 0;
  transition: transform 0.2s linear;
}

.sidebar-nav .nav-link:not(.collapsed) .mgc_down_line {
  transform: rotate(180deg);
}

.sidebar-nav .nav-link:not(.collapsed) span {
  color: var(--sidemenu-hilight-color);
}

.sidebar-nav .nav-content {
  padding: 5px 0px 0px 20px;
  margin: 0 1.3rem 0 1rem;
  list-style: none;
  transition: var(--main-transition);
  cursor: pointer;
}

.sidebar-nav .nav-content a {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: var(--sidemenu-item-color);
  text-decoration: none;
  font-weight: 620;
}

.sidebar-nav .nav-content a::before {
  content: '\ee05';
  font-family: 'MingCute';
  font-size: 12px;
  margin-right: 13px;
}

.sidebar-nav .nav-content a.active::before {
  content: '\ee04';
}

.sidebar-nav .nav-content a:hover,
.sidebar-nav .nav-content a.active {
  color: var(--sidemenu-hilight-color);
  background-color: var(--main-color);
  border-radius: 4px;
}

/* closed Mode */
.sidebar.closed {
  right: calc(var(--sidemenu-width) - (var(--sidemenu-width) + var(--sidemenu-width)) + 7px);
  transition: var(--main-transition);
}

/* extra */
.rotate-n-15 {
  transform: rotate(-15deg);
}

.offcanvas {
  width: calc(var(--sidemenu-width) + 0.5px);

  .offcanvas-body {
    padding: 0;

    .menu-panel {
      width: calc(var(--sidemenu-width) - 1px);
    }
  }
}

@media (max-width: 991px) {
  .sidebar {
    right: calc(var(--sidemenu-width) - (var(--sidemenu-width) + var(--sidemenu-width)) + 8px);
    transition: var(--main-transition);

    .toggle-panel-active-tabs {
      width: calc(100% - 2.25rem);
    }
  }
}
</style>

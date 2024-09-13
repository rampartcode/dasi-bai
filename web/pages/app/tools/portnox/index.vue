<script setup lang="ts"></script>

<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item">
              <nuxt-link to="/">
                <House size="20" />
              </nuxt-link>
            </li>
            <li class="mx-2">
              <ChevronRight size="24" />
            </li>
            <li>
              <LayoutDashboard size="20" />
            </li>
            <li class="mx-2">
              <ChevronRight size="24" />
            </li>
            <li class="breadcrumb-item active" aria-current="page">Portnox</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

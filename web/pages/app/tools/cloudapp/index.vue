<script setup lang="ts"></script>

<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">CloudApp Security</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item">
              <nuxt-link to="/" href="javascript:;">
                <Icon name="bx:home-alt" size="20" />
              </nuxt-link>
            </li>
            <li class="mx-2">
              <Icon name="bx:chevron-right" size="24" />
            </li>
            <li>
              <Icon name="bx:category" size="20" />
            </li>
            <li class="mx-2">
              <Icon name="bx:chevron-right" size="24" />
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              CloudApp Security
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="card h-full">
      <div class="card-body">
        <div class="p-4 border rounded">
          <div class="text-center mb-4">
            <h4>Realizar filtro de dados</h4>
          </div>
          <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4 position-relative">
              <select class="form-select" id="validationTooltip04">
                <option value="">Hoje</option>
                <option value="">7 Dias</option>
                <option value="">30 Dias</option>
              </select>
              <div class="invalid-tooltip">Please select a valid state.</div>
            </div>

            <div class="col-md-3 position-relative">
              <input
                type="date"
                class="form-control"
                placeholder="Data inicial"
                title="Data Inicial "
              />
              <div class="invalid-tooltip">Please provide a valid city.</div>
            </div>

            <div class="col-md-3 position-relative">
              <input
                type="date"
                class="form-control"
                id="validationTooltip05"
                title="Data Final"
              />
              <div class="invalid-tooltip">Please provide a valid zip.</div>
            </div>
            <div class="col-md-2 position-relative">
              <label for="validationTooltip05" class="form-label"></label>
              <button
                class="btn btn-outline-secondary bg-white/30 text-neutral-900"
                type="button"
              >
                <Icon name="bx:search" />
              </button>
              <div class="invalid-tooltip">Please provide a valid zip.</div>
            </div>
          </form>
        </div>
      </div>
    </div>

    Download's Suspeitos <br />
    Viagem Impossivel <br />
    Exclusão de Ficheiros em Massa <br />
    Geolocalização Suspeitas
  </div>
</template>

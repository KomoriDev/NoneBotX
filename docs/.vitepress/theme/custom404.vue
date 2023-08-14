<script lang="ts" setup></script>

<template>
  <div class="not-found">
    <p class="code">🤔</p>
    <h1 class="title">Oops！页面好像走丢惹~</h1>
    <div class="divider"></div>
    <blockquote class="quote">生活就像海洋，只有意志坚强的人才能到达彼岸。 ——马克思</blockquote>
    <route-link class="action">
      <a class="link" href="/" aria-label="返回首页"> 返回首页 </a>
    </route-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  padding: 96px 24px 96px;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .not-found {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 100px;
  font-size: 100px;
  font-weight: 600;
}

.title {
  padding-top: 36px;
  line-height: 20px;
  font-size: 26px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action > a {
  margin-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-dark);
  color: var(--vp-c-brand-dark);
}
</style>

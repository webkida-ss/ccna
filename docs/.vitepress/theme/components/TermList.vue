<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Term } from '../../../data/terms'

const props = defineProps<{
  terms: Term[]
}>()

const storageKey = 'ccna-glossary-learned-terms'
const searchText = ref('')
const selectedCategory = ref('all')
const selectedTag = ref('')
const learnedFilter = ref<'all' | 'learned' | 'unlearned'>('all')
const learnedIds = ref<Set<string>>(new Set())
const currentPage = ref(1)
const pageSize = ref(5)
const sortMode = ref<'default' | 'title'>('default')

const categories = computed(() => {
  return ['all', ...Array.from(new Set(props.terms.map((term) => term.category)))]
})

const filteredTerms = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()

  return props.terms.filter((term) => {
    const learned = learnedIds.value.has(term.id)
    const matchesCategory =
      selectedCategory.value === 'all' || term.category === selectedCategory.value
    const matchesTag = selectedTag.value.length === 0 || term.related.includes(selectedTag.value)
    const matchesLearned =
      learnedFilter.value === 'all' ||
      (learnedFilter.value === 'learned' && learned) ||
      (learnedFilter.value === 'unlearned' && !learned)
    const matchesKeyword =
      keyword.length === 0 ||
      [term.title, term.reading, term.category, term.summary, term.point, term.tips, ...term.related]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(keyword))

    return matchesCategory && matchesTag && matchesLearned && matchesKeyword
  })
})

const learnedCount = computed(() => learnedIds.value.size)
const sortedTerms = computed(() => {
  if (sortMode.value !== 'title') return filteredTerms.value

  return [...filteredTerms.value].sort((a, b) => a.title.localeCompare(b.title, 'ja'))
})
const totalPages = computed(() => Math.max(1, Math.ceil(sortedTerms.value.length / pageSize.value)))
const paginatedTerms = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedTerms.value.slice(start, start + pageSize.value)
})
const pageStart = computed(() => {
  if (sortedTerms.value.length === 0) return 0
  return (currentPage.value - 1) * pageSize.value + 1
})
const pageEnd = computed(() => Math.min(currentPage.value * pageSize.value, sortedTerms.value.length))

function toggleLearned(termId: string) {
  const nextIds = new Set(learnedIds.value)

  if (nextIds.has(termId)) {
    nextIds.delete(termId)
  } else {
    nextIds.add(termId)
  }

  learnedIds.value = nextIds
}

function selectTag(tag: string) {
  selectedTag.value = selectedTag.value === tag ? '' : tag
}

function changePage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

onMounted(() => {
  const storedValue = localStorage.getItem(storageKey)
  if (!storedValue) return

  try {
    learnedIds.value = new Set(JSON.parse(storedValue))
  } catch {
    learnedIds.value = new Set()
  }
})

watch(
  learnedIds,
  (ids) => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(ids)))
  },
  { deep: false }
)

watch([searchText, selectedCategory, selectedTag, learnedFilter, pageSize, sortMode], () => {
  currentPage.value = 1
})

watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages
})
</script>

<template>
  <div class="term-list">
    <div class="filters">
      <label class="field">
        <span class="field-label">検索</span>
        <input v-model="searchText" type="search" placeholder="VLAN, OSPF, セキュリティ" />
      </label>

      <label class="field">
        <span class="field-label">カテゴリ</span>
        <select v-model="selectedCategory">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category === 'all' ? 'すべて' : category }}
          </option>
        </select>
      </label>

      <div class="learned-filters">
        <button
          type="button"
          :class="{ active: learnedFilter === 'learned' }"
          @click="learnedFilter = learnedFilter === 'learned' ? 'all' : 'learned'"
        >
          習得済みのみ
        </button>
        <button
          type="button"
          :class="{ active: learnedFilter === 'unlearned' }"
          @click="learnedFilter = learnedFilter === 'unlearned' ? 'all' : 'unlearned'"
        >
          習得済み非表示
        </button>
      </div>
    </div>

    <div class="list-meta">
      <p class="result-summary">
        {{ pageStart }}-{{ pageEnd }}/{{ sortedTerms.length }}
        <span v-if="learnedCount > 0">済 {{ learnedCount }}</span>
      </p>
      <div class="meta-actions">
        <label class="page-size-control">
          <select v-model.number="pageSize">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
          <span>件/ページ</span>
        </label>
        <div class="sort-buttons" aria-label="ソート">
          <button
            type="button"
            :class="{ active: sortMode === 'default' }"
            @click="sortMode = 'default'"
          >
            登録順
          </button>
          <button
            type="button"
            :class="{ active: sortMode === 'title' }"
            @click="sortMode = 'title'"
          >
            名前順
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedTag" class="active-filter">
      <span>#{{ selectedTag }}</span>
      <button type="button" @click="selectedTag = ''">解除</button>
    </div>

    <div class="cards">
      <article
        v-for="term in paginatedTerms"
        :key="term.id"
        tabindex="0"
        class="term-card"
        :class="{ learned: learnedIds.has(term.id) }"
      >
        <div class="term-card-header">
          <div class="term-title">
            <div class="title-line">
              <h2>{{ term.title }}</h2>
            </div>
          </div>

          <button class="status-button" type="button" @click="toggleLearned(term.id)">
            {{ learnedIds.has(term.id) ? '習得済み' : '未習得' }}
          </button>
        </div>

        <ul class="related">
          <li v-for="item in term.related" :key="item">
            <button
              type="button"
              :class="{ active: selectedTag === item }"
              @click="selectTag(item)"
            >
              {{ item }}
            </button>
          </li>
        </ul>

        <div class="term-popover" role="tooltip">
          <p v-if="term.reading" class="full-name">{{ term.reading }}</p>
          <p>{{ term.summary }}</p>
          <p class="point">{{ term.point }}</p>
          <p class="tips">覚え方: {{ term.tips }}</p>
        </div>
      </article>
    </div>

    <nav v-if="totalPages > 1" class="pager" aria-label="ページング">
      <button type="button" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        前へ
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        type="button"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        次へ
      </button>
    </nav>
  </div>
</template>

<style scoped>
.term-list {
  margin-top: 0;
}

.filters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(140px, 190px);
  gap: 6px;
  align-items: end;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: #f5f9ff;
}

.field {
  display: grid;
  gap: 3px;
  font-size: 12px;
  font-weight: 600;
}

.field input,
.field select {
  width: 100%;
  min-height: 36px;
  padding: 6px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: #ffffff;
  color: #172033;
  font-size: 14px;
}

.field input::placeholder {
  color: #8aa0bb;
}

.learned-filters {
  display: flex;
  gap: 6px;
  grid-column: 1 / -1;
}

.learned-filters button {
  min-height: 30px;
  padding: 4px 10px;
  border: 1px solid #d7e8fb;
  border-radius: 999px;
  background: #ffffff;
  color: #5c6b82;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

.learned-filters button.active {
  border-color: #1570ef;
  background: #e8f2ff;
  color: #1570ef;
}

.list-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 6px 0;
}

.result-summary {
  display: flex;
  gap: 8px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.2;
}

.meta-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.page-size-control {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
}

.page-size-control select {
  min-height: 26px;
  padding: 2px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: #ffffff;
  color: #172033;
  font-size: 12px;
  font-weight: 700;
}

.sort-buttons {
  display: inline-flex;
  gap: 4px;
  padding: 2px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: #f5f9ff;
}

.sort-buttons button {
  min-height: 26px;
  padding: 3px 8px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

.sort-buttons button.active {
  background: #e8f2ff;
  color: #1570ef;
}

.active-filter {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  margin: 0 0 6px;
  padding: 3px 5px 3px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
}

.active-filter button {
  min-height: 22px;
  padding: 2px 7px;
  border: 0;
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-weight: 700;
}

.cards {
  display: grid;
  gap: 10px;
}

.term-card {
  position: relative;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(21, 112, 239, 0.06);
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.term-card.learned {
  background: #f6f8fb;
  opacity: 0.62;
  filter: grayscale(1);
}

.term-card:focus,
.term-card:focus-within,
.term-card:hover {
  z-index: 5;
  border-color: #9dccff;
  box-shadow: 0 10px 26px rgba(21, 112, 239, 0.14);
  transform: translateY(-1px);
}

.term-card-header {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.term-title {
  min-width: 0;
}

.title-line {
  display: flex;
  gap: 6px;
  align-items: baseline;
  min-width: 0;
}

.term-card h2 {
  margin: 0;
  border-top: 0;
  padding-top: 0;
  color: #0f1f38;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.15;
  white-space: nowrap;
}

.status-button {
  flex: 0 0 auto;
  min-width: 52px;
  min-height: 24px;
  padding: 3px 7px;
  border: 1px solid #d7e8fb;
  border-radius: 999px;
  background: #f6fbff;
  color: #6b86a6;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
}

.term-card.learned .status-button {
  border-color: var(--vp-c-divider);
  background: #edf2f7;
  color: #667085;
}

.related {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  overflow-x: auto;
  margin: 7px -2px 0;
  padding: 0;
  scrollbar-width: none;
}

.related::-webkit-scrollbar {
  display: none;
}

.related li {
  list-style: none;
}

.related button {
  min-height: 24px;
  padding: 2px 7px;
  border: 0;
  border-radius: 999px;
  background: #edf6ff;
  color: #43617f;
  cursor: pointer;
  font-size: 11px;
  line-height: 1.3;
}

.related button.active {
  background: #d9ebff;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.term-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 10px;
  left: 10px;
  z-index: 10;
  padding: 10px 12px;
  border: 1px solid #2563eb;
  border-radius: 12px;
  background: #173b74;
  box-shadow: 0 14px 34px rgba(15, 45, 90, 0.28);
  color: #f8fbff;
  font-size: 12px;
  line-height: 1.55;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.term-popover::before {
  position: absolute;
  top: -6px;
  left: 18px;
  width: 10px;
  height: 10px;
  border-top: 1px solid #2563eb;
  border-left: 1px solid #2563eb;
  background: #173b74;
  content: '';
  transform: rotate(45deg);
}

.term-card:focus .term-popover,
.term-card:focus-within .term-popover,
.term-card:hover .term-popover {
  opacity: 1;
  transform: translateY(0);
}

.term-popover p {
  margin: 0;
}

.term-popover p + p {
  margin-top: 4px;
}

.full-name {
  color: #bfdbfe;
  font-weight: 700;
}

.point {
  color: #dbeafe;
}

.tips {
  padding-top: 4px;
  border-top: 1px solid rgba(219, 234, 254, 0.22);
  color: #fef3c7;
}

.pager {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 14px 0 2px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.pager button {
  min-width: 64px;
  min-height: 30px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: #ffffff;
  color: #172033;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

.pager button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

@media (max-width: 720px) {
  .term-list {
    margin-top: 0;
  }

  .filters {
    grid-template-columns: minmax(0, 1fr) 96px;
    position: sticky;
    top: 0;
    z-index: 1;
    margin-inline: 0;
    padding: 10px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .field input,
  .field select {
    min-height: 31px;
    padding-block: 4px;
    font-size: 13px;
  }

  .field-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  .learned-filters {
    gap: 5px;
  }

  .learned-filters button {
    flex: 1 1 0;
    min-height: 28px;
    padding-inline: 6px;
    font-size: 11px;
  }

  .list-meta {
    margin: 10px 4px;
  }

  .page-size-control {
    font-size: 11px;
  }

  .term-card-header {
    align-items: center;
  }

  .term-card {
    margin-inline: 8px;
    padding: 11px 12px;
    border-radius: 13px;
  }

  .term-card h2 {
    font-size: 19px;
  }

  .status-button {
    min-width: 50px;
    min-height: 23px;
    padding-inline: 6px;
    font-size: 11px;
  }

  .related {
    gap: 4px;
  }

  .related button {
    min-height: 22px;
    font-size: 11px;
  }

  .pager {
    margin-top: 16px;
  }
}
</style>

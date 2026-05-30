---
outline: false
layout: page
---

<script setup>
import TermList from '../.vitepress/theme/components/TermList.vue'
import { terms } from '../data/terms'
</script>

<TermList :terms="terms" />

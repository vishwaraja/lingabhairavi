// Turn the content team's review markers into a short, quiet note for readers.
// "[VERIFY: ...]" -> "(to be checked)"; "[Tamil: needs native review]" -> removed.
export default function remarkReviewTags() {
  const walk = (node) => {
    if (node.type === 'text') {
      node.value = node.value
        .replace(/\s*\[Tamil: needs native review\]/g, '')
        .replace(/\s*\[VERIFY[^\]]*\]/g, ' (to be checked)');
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

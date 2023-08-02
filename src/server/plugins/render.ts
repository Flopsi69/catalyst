export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    html.head.push('<script>var global = global || window</script>');
    html.head.push(`<script type="module">
      import { Buffer as Buffer } from '/Buffer.js'
      
      window.Buffer = Buffer || []
      window.process = window.process || { env: {} }
      Buffer.from('anything','base64');
      window.decoded = Buffer.from(base64String, 'base64')
    </script>`);
  });
});

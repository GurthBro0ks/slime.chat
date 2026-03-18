#!/bin/bash
# Run this after fixing sudoers
# Adds chat.slimyai.xyz proxy to host Caddy

echo 'chat.slimyai.xyz {
    reverse_proxy localhost:8080
}' | sudo tee -a /etc/caddy/Caddyfile

sudo systemctl reload caddy
echo "Caddy updated. Test with: curl -sI https://chat.slimyai.xyz"

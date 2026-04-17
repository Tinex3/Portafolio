#!/bin/bash
# Test script para la API de estabilidad

API_URL="${1:-http://localhost:5876}"
DEVICE_ID="${2:-sim_rpi_test_001}"

echo "Testing Stability API at $API_URL"
echo "Device ID: $DEVICE_ID"
echo ""

# Health check
echo "1. Testing health check..."
curl -s "${API_URL}/api/health" | jq . || echo "Error on health check"
echo ""

# Send sample data
echo "2. Sending sample stability record..."
curl -s -X POST "${API_URL}/api/stability" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "'${DEVICE_ID}'",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.000Z)'",
    "csq": 22,
    "network": "registrado, red doméstica",
    "network_type": "LTE",
    "registered": true,
    "uptime_sec": 7200,
    "attempt": 1
  }' | jq . || echo "Error sending data"
echo ""

# Get latest records
echo "3. Retrieving latest records for device..."
curl -s "${API_URL}/api/stability/${DEVICE_ID}" | jq . || echo "Error retrieving records"
echo ""

# Get stats
echo "4. Getting stats for all devices..."
curl -s "${API_URL}/api/stats" | jq . || echo "Error getting stats"
echo ""

echo "Tests completed!"

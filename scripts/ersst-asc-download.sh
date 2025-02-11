#!/bin/sh
yr=2024
while [ $yr -le 2025 ]; do
  echo "Downloading file for year $yr"
  wget https://www.ncei.noaa.gov/pub/data/cmb/ersst/v5/ascii/ersst.v5.$yr.asc
  yr=`expr $yr + 1`
done

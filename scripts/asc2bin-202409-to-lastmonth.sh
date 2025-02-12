#!/bin/bash
# Script to run asc2bin from September 2024 up to last month

# Starting values
start_year=2024
start_month=9

# Calculate the end year and month as "current month minus one" using GNU date.
end_year=$(date --date="last month" +"%Y")
end_month=$(date --date="last month" +"%m")

echo "Processing from ${start_year}-${start_month} to ${end_year}-${end_month}"

# Initialize loop variables
year=$start_year
month=$start_month

while [ "$year" -lt "$end_year" ] || { [ "$year" -eq "$end_year" ] && [ "$month" -le "$end_month" ]; }
do
    # Format month with a leading zero if needed
    month_padded=$(printf "%02d" "$month")
    
    # Construct the filenames:
    # Input file: ersst.v5.<year>.asc
    # Output file: ersst.v5.<year><month_padded>.bin
    input_file="ersst.v5.${year}.asc"
    output_file="ersst.v5.${year}${month_padded}.bin"
    
    echo "Running: asc2bin $input_file $output_file $year $month_padded"
    
    # Run the asc2bin command with the constructed parameters
    ./asc2bin "$input_file" "$output_file" "$year" "$month_padded"
    
    # Increment the month and adjust the year if necessary
    if [ "$month" -eq 12 ]; then
        month=1
        year=$((year + 1))
    else
        month=$((month + 1))
    fi
done
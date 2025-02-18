program asc2bin
  implicit none

  ! Variable for the title (exactly 80 characters)
  character(len=80) :: title

  ! Arrays for data (89x180 for input, 180x89 for output)
  real, dimension(89,180)  :: data_in
  real, dimension(180,89)  :: data_out

  ! Auxiliary variables
  integer :: i, j, ios
  character(len=256) :: infile, outfile
  character(len=32)  :: year, month

  ! Check the command-line arguments
  if (command_argument_count() < 4) then
     print *, "Usage: asc2bin input.asc output.bin year month"
     stop
  end if

  ! Retrieve arguments
  call get_command_argument(1, infile)
  call get_command_argument(2, outfile)
  call get_command_argument(3, year)
  call get_command_argument(4, month)

  ! Create title
  title = "Monthly Sea Surface Temperature anom (C " // trim(year) // " " // trim(month)

  ! Read ASCII file
  open(unit=10, file=infile, status='old', action='read', form='formatted', iostat=ios)
  if (ios /= 0) then
     print *, "Error opening input file: ", infile
     stop
  end if

  do j = 1, 180
     read(10,*) (data_in(i,j), i=1,89)
  end do
  close(10)

  ! Transpose data to 180x89 format
  data_out = transpose(data_in)

  ! Write binary file
  open(unit=20, file=outfile, form='unformatted', access='sequential', status='replace', iostat=ios)
  if (ios /= 0) then
     print *, "Error creating output file: ", outfile
     stop
  end if

  write(20) title, data_out
  close(20)

  print *, "Binary file saved:", outfile

end program asc2bin